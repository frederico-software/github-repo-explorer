import { TestBed } from '@angular/core/testing';

import { GithubAPIService } from './github-api.service';

describe('GithubAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GithubAPIService = TestBed.get(GithubAPIService);
    expect(service).toBeTruthy();
  });
});
