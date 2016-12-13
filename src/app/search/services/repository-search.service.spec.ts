/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { RepositorySearchService } from './repository-search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [RepositorySearchService]
    });
  });

  it('should work', inject([RepositorySearchService], (service: RepositorySearchService) => {
    expect(service).toBeTruthy();
  }));

  // TODO: inject mocked up store here (instead of entire SharedModule) and test the states
  xit('should return correct state from the store', inject([RepositorySearchService], (service: RepositorySearchService) => {
  }));
});
