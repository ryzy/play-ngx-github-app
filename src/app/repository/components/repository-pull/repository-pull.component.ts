import { Component, Input } from '@angular/core';
import { PullRequest } from '../../../shared/model/pull-request';

@Component({
  selector: 'app-repository-pull',
  templateUrl: './repository-pull.component.html',
  styleUrls: ['./repository-pull.component.scss']
})
export class RepositoryPullComponent {
  @Input() public pull: PullRequest;
}
