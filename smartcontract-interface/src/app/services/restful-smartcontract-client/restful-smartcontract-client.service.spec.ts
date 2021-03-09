import { TestBed } from '@angular/core/testing';

import { RestfulSmartcontractClientService } from './restful-smartcontract-client.service';
import {LogService} from '../logging/log.service';

describe('RestfulSmartcontractClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RestfulSmartcontractClientService,
      LogService
    ]
  }));

  it('moet worden aangemaakt', () => {
    const service: RestfulSmartcontractClientService = TestBed.get(RestfulSmartcontractClientService);
    expect(service).toBeTruthy();
  });
});
