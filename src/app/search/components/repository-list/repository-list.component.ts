import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Repository } from '../../../shared/model/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() public repositories: Repository[];
  @Output() public selectRepository = new EventEmitter<Repository>();

  public navigateToRepository(repository: Repository) {
    this.selectRepository.next(repository);
  }
}
