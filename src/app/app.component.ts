import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorService } from './shared/services/error.service';
import { AppError } from './shared/model/app-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public appError$: Observable<AppError>;

  constructor(
    private errorService: ErrorService
  ) { }

  public ngOnInit() {
    this.appError$ = this.errorService.getAppError();
  }
}
