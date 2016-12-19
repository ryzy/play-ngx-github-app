import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository-readme',
  templateUrl: './repository-readme.component.html',
  styleUrls: ['./repository-readme.component.scss']
})
export class RepositoryReadmeComponent {
  @Input() public readme: string;
}
