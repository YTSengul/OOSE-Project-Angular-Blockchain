import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../../components/header/header.component';
import {OverzichtComponent} from '../../components/overzicht/overzicht.component';
import {AanmakenSmartcontractComponent} from '../../components/aanmaken-smartcontract/aanmaken-smartcontract.component';
import {ParameterComponent} from '../../components/parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';

describe('LogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      HeaderComponent,
      OverzichtComponent,
      AanmakenSmartcontractComponent,
      ParameterComponent
    ],
    imports: [
      SmartContractInterfaceMaterialModule
    ]}));

  it('moet worden aangemaakt', () => {
    const service: LogService = TestBed.get(LogService);
    expect(service).toBeTruthy();
  });
});
