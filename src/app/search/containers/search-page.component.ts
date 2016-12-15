import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

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

  constructor(private searchService: SearchService) {
    this.searchQuery$ = searchService.getSearchQuery().take(1);
    this.isLoading$ = searchService.isLoading();
    this.repositories$ = searchService.getRepositories();
    this.error$ = searchService.getError();

    // Load trending repositories on start
    // TODO: only load when there's no initial search query!
    searchService.loadTrending();
  }

  public doSearch(query: string) {
    this.searchService.doSearch(query);
  }
}
