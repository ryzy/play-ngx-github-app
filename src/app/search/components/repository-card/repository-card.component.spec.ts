/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { repositoryTestData } from '../../../../testing/fixtures/repository';
import { SharedModule } from '../../../shared/shared.module';
import { RepositoryCardComponent } from './repository-card.component';

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;
  let titleEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryCardComponent ],
      imports: [ SharedModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryCardComponent);

    component = fixture.componentInstance;
    component.repository = repositoryTestData;
    fixture.detectChanges();

    titleEl = fixture.debugElement.query(By.css('.card-title')).nativeElement;
  });

  it('should work', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain(repositoryTestData.name);
  });
});
