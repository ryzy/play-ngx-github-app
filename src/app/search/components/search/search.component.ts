import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /**
   * Initially provided search query value (if any)
   * @type {string}
   */
  @Input() public query = '';

  /**
   * Flag indicating that search is in progress
   * @type {boolean}
   */
  @Input() public loading = false;

  /**
   * Emits search string on each change
   * @type {EventEmitter<string>}
   */
  @Output() public search = new EventEmitter<string>();


  public doSearch(query: string) {
    this.search.emit(query);
  }
}
