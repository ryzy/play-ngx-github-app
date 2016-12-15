import { Component, Input } from '@angular/core';
import { AppError } from '../../model/app-error';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {
  @Input() public error: AppError;
}
