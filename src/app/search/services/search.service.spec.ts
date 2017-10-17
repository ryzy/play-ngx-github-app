/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchService } from './search.service';
import { CoreModule } from '../../core/core.module';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
      ],
      providers: [
        SearchService,
      ]
    });
  });

  it('should work', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return correct state from the store', inject([SearchService], (service: SearchService) => {
    pending('@TODO: inject mocked up store here (instead of entire SharedModule) and test the states');
  }));
});
