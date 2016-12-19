/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { repositoryTestData } from '../../../../testing/fixtures/repository';
import { SharedModule } from '../../../shared/shared.module';
import { RepositoryComponent } from './repository.component';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;
  let titleEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ RepositoryComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);

    component = fixture.componentInstance;
    component.repository = repositoryTestData;
    titleEl = fixture.debugElement.query(By.css('md-card-title')).nativeElement;

    fixture.detectChanges();
  });

  it('should work', () => {
    expect(component).toBeTruthy();

  });
});
