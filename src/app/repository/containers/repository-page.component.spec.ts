/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActivatedRouteStub } from '../../../testing/activated-route.stub';
import { SharedModule } from '../../shared/shared.module';
import { RepositoryPageComponent } from './repository-page.component';
import { RepositoryComponent } from '../components/repository/repository.component';
import { RepositoryService } from '../services/repository.service';
import { RepositoryModule } from '../repository.module';

describe('RepositoryPageComponent', () => {
  let component: RepositoryPageComponent;
  let fixture: ComponentFixture<RepositoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, SharedModule.provideStoreModule(), RepositoryModule ],
      providers: [ RepositoryService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
