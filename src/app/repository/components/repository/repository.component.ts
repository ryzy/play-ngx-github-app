import { Component, Input } from '@angular/core';

import { RepositoryFragment } from '../../../core/queries.types';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input() public repository: RepositoryFragment;
}
