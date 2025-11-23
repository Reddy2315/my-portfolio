import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: Contact;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contact);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
