import { Component } from '@angular/core';
import { RepositorySearchService } from '../services/repository-search.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  public searchQuery$: Observable<string>;
  public isLoading$: Observable<boolean>;

  constructor(private searchService: RepositorySearchService) {
    this.searchQuery$ = searchService.getSearchQuery().take(1);
    this.isLoading$ = searchService.isLoading();
  }

  public doSearch(query: string) {
    this.searchService.doSearch(query);
  }
}
