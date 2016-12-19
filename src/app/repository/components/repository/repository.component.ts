import { Component, Input } from '@angular/core';
import { Repository } from '../../../shared/model/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent {
  @Input() public repository: Repository;
}
