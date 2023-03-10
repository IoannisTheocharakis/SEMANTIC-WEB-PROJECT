/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonElementsService } from './common-elements.service';

describe('Service: CommonElements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonElementsService]
    });
  });

  it('should ...', inject([CommonElementsService], (service: CommonElementsService) => {
    expect(service).toBeTruthy();
  }));
});
