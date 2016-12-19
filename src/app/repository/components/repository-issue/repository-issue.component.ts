import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../shared/model/issue';

@Component({
  selector: 'app-repository-issue',
  templateUrl: './repository-issue.component.html',
  styleUrls: ['./repository-issue.component.scss']
})
export class RepositoryIssueComponent {
  @Input() public issue: Issue;

  public getLabelColor(color) {
    return '#' + color;
  }
}
