/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, SharedModule.provideStoreModule()],
      providers: [SearchService]
    });
  });

  it('should work', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return correct state from the store', inject([SearchService], (service: SearchService) => {
    pending('@TODO: inject mocked up store here (instead of entire SharedModule) and test the states');
  }));
});
