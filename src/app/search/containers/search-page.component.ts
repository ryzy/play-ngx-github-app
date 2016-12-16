import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineLatest';

import { SearchService } from '../services/search.service';
import { Repository } from '../../shared/model/repository';
import { AppError } from '../../shared/model/app-error';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public searchQuery$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public repositories$: Observable<Repository[]>;
  public error$: Observable<AppError>;
  public noResults$: Observable<boolean>;

  /**
   * Flag indicating that we show search results,
   * not trending repositories (loaded when there's no search query)
   *
   * @type {boolean}
   */
  public showingSearchResults = false;


  constructor(
    private searchService: SearchService
  ) {
    this.searchQuery$ = searchService.getSearchQuery().take(1);
    this.isLoading$ = searchService.isLoading();
    this.repositories$ = searchService.getRepositories();
    this.error$ = searchService.getError();

    // Determine if `no result` message should be shown
    // (i.e. search query present, but repository list empty and no error).
    this.noResults$ = searchService.getSearchQuery()
      .combineLatest(this.repositories$, this.isLoading$, this.error$)
      .map((combined) => {
        const [query, repositories, loading, error] = combined;
        return query && repositories.length === 0 && !loading && !error;
      });

    this.doInitialSearch();
  }

  /**
   * Perform search
   *
   * @param query
   */
  public doSearch(query: string) {
    this.showingSearchResults = true;
    this.searchService.doSearch(query);
  }

  /**
   * Perform navigating to clicked repository
   *
   * @param repository
   */
  public selectRepository(repository: Repository) {
    this.searchService.selectRepository(repository);
  }

  /**
   * The app shows Trending repositories when user initially lands on the main page.
   * If there's already query param (?q=...), perform normal search.
   *
   * Note: we only subscribe to the 1st change (.take(1)) and ignore the next ones
   * when the URL is updated due to user's typing in the search box.
   */
  private doInitialSearch() {
    this.searchQuery$
      .combineLatest(this.repositories$)
      .take(1)
      .subscribe((combined) => {
        const [q, repositories] = combined;

        // Update `showingSearchResults` if we have a query string on start
        this.showingSearchResults = !!q;

        // Do we already have some repositories loaded in the store?
        // Do nothing then (it means we came back to this page
        // from another page and therefore nothing needs to be done,
        // previously displayed list of repositories is fine).
        if (repositories.length) {
          return;
        }

        if (q) {
          // Do we have search query? Perform the search
          this.doSearch(q);
        } else {
          // No search query? Load trending repositories.
          this.searchService.loadTrending();
        }
      });
  }
}
