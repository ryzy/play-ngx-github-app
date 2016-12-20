import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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

  private keyUpStream = new EventEmitter<string>();

  public ngOnInit() {
    this.keyUpStream
      .distinctUntilChanged()
      // Emit new values in @Output `change` only on a new distinct value
      .subscribe((value) => this.search.emit(value));
  }

  public onKeyUp(value: string) {
    this.keyUpStream.emit(value);
  }
}
