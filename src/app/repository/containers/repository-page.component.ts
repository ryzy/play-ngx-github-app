import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.scss']
})
export class RepositoryPageComponent {

  constructor(private route: ActivatedRoute) {
    console.log('RepositoryPageComponent, route:', this.route);
  }
}
