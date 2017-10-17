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
   */
  @Input() public query: string = '';

  /**
   * Flag indicating that search is in progress
   */
  @Input() public loading: boolean = false;

  /**
   * Emits search string on each change
   */
  @Output() public search: EventEmitter<string> = new EventEmitter();

  private keyUpStream: EventEmitter<string> = new EventEmitter();

  public ngOnInit(): void {
    this.keyUpStream
      .distinctUntilChanged()
      // Emit new values in @Output `change` only on a new distinct value
      .subscribe((value) => this.search.emit(value));
  }

  public onKeyUp(value: string): void {
    this.keyUpStream.emit(value);
  }
}
