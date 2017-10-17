/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from '../../core/core.module';
import { RepositoryPageComponent } from './repository-page.component';
import { RepositoryService } from '../services/repository.service';
import { RepositoryModule } from '../repository.module';

describe('RepositoryPageComponent', () => {
  let component: RepositoryPageComponent;
  let fixture: ComponentFixture<RepositoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          CoreModule,
          RepositoryModule,
        ],
        providers: [ RepositoryService ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(RepositoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
