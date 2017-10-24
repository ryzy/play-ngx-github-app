import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RepositoryFragment } from '../../../core/queries.types';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() public repositories: RepositoryFragment[];
  @Output() public selectRepository: EventEmitter<RepositoryFragment> = new EventEmitter();

  public navigateToRepository(repository: RepositoryFragment, ev: Event): void {
    if ((ev.target as any)['href']) {
      return; // Skip navigation if user clicked on a link with `href` attribute set
    }

    this.selectRepository.next(repository);
  }
}
