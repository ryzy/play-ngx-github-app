import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineLatest';

import { SearchService } from '../services/search.service';
import { RepositoryFragment } from '../../core/queries.types';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public searchQuery$: Observable<string|undefined>;
  public isLoading$: Observable<boolean>;
  public repositories$: Observable<RepositoryFragment[]>;
  public noResults$: Observable<boolean>;
  public showingTrending$: Observable<boolean>;

  private ngOnDestroy$: EventEmitter<boolean> = new EventEmitter();

  public constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.searchQuery$ = this.searchService.getSearchQuery().map(q => q || '');
    this.isLoading$ = this.searchService.isLoading();
    this.repositories$ = this.searchService.getRepositories();
    this.showingTrending$ = this.searchService.hasTrending();

    // Determine if `no result` message should be shown
    // (i.e. search query present, but repository list empty).
    this.noResults$ = this.searchService.getSearchQuery()
      .combineLatest(this.repositories$, this.isLoading$)
      .takeUntil(this.ngOnDestroy$)
      .map((combined) => {
        const [query, repositories, loading] = combined;
        return !!query && repositories.length === 0 && !loading;
      })
    ;

    this.doInitialSearch();
  }

  public ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  /**
   * Perform search
   *
   * @param query
   */
  public doSearch(query?: string): void {
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
  public selectRepository(repository: RepositoryFragment): void {
    this.searchService.selectRepository(repository);
  }

  /**
   * The app shows Trending repositories when user initially lands on the main page.
   * If there's already query param (?q=...), perform normal search.
   *
   * Note: we only subscribe to the 1st change (.take(1)) and ignore the next ones
   * when the URL is updated due to user's typing in the search box.
   */
  private doInitialSearch(): void {
    this.route.queryParamMap
      .takeUntil(this.ngOnDestroy$)
      .map((params: ParamMap) => params.get('q'))
      .distinctUntilChanged()
      .subscribe((q: string) => {
        this.doSearch(q);
      });
  }
}
