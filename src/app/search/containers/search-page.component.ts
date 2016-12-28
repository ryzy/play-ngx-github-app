import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
export class SearchPageComponent implements OnInit {
  public searchQuery$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public repositories$: Observable<Repository[]>;
  public noResults$: Observable<boolean>;
  public showingTrending$: Observable<boolean>;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.searchQuery$ = this.searchService.getSearchQuery();
    this.isLoading$ = this.searchService.isLoading();
    this.repositories$ = this.searchService.getRepositories();
    this.showingTrending$ = this.searchService.hasTrending();

    // Determine if `no result` message should be shown
    // (i.e. search query present, but repository list empty).
    this.noResults$ = this.searchService.getSearchQuery()
      .combineLatest(this.repositories$, this.isLoading$)
      .map((combined) => {
        const [query, repositories, loading] = combined;
        return query && repositories.length === 0 && !loading;
      })
    ;

    this.doInitialSearch();
  }

  /**
   * Perform search
   *
   * @param query
   */
  public doSearch(query: string) {
    if (query) {
      this.searchService.doSearch(query);
    } else {
      this.searchService.loadTrending();
    }
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
    this.route.queryParams
      .map((params: Params) => params['q'])
      .combineLatest(this.repositories$)
      .take(1)
      .subscribe((combined) => {
        const [q, repositories] = combined;

        // Do we already have some repositories loaded in the store?
        // Do nothing then (it means we came back to this page
        // from another page and therefore nothing needs to be done,
        // previously displayed list of repositories is fine).
        if (repositories.length) {
          return;
        }

        this.doSearch(q);
      });
  }
}
