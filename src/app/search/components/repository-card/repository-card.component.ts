import { Component, Input } from '@angular/core';

import { RepositoryFragment } from '../../../core/queries.types';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent {
  @Input() public repository: RepositoryFragment;
}
