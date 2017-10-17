import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Repository } from '../../../shared/model/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() public repositories: Repository[];
  @Output() public selectRepository: EventEmitter<Repository> = new EventEmitter();

  public navigateToRepository(repository: Repository, ev: Event): void {
    if ((ev.target as any)['href']) {
      return; // Skip navigation if user clicked on a link with `href` attribute set
    }

    this.selectRepository.next(repository);
  }
}
