import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Commit } from '../../../shared/model/commit';

@Component({
  selector: 'app-repository-commit',
  templateUrl: './repository-commit.component.html',
  styleUrls: ['./repository-commit.component.scss']
})
export class RepositoryCommitComponent {
  @Input() public commit: Commit;
}
