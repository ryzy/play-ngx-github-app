import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../../../shared/model/repository';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
  @Input() public repositories: Repository[];
}
