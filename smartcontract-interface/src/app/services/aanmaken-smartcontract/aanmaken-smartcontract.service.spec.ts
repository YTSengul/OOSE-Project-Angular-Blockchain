import {ComponentFixture, TestBed} from '@angular/core/testing';

import { AanmakenSmartcontractService } from './aanmaken-smartcontract.service';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../../components/header/header.component';
import {OverzichtComponent} from '../../components/overzicht/overzicht.component';
import {AanmakenSmartcontractComponent} from '../../components/aanmaken-smartcontract/aanmaken-smartcontract.component';
import {ParameterComponent} from '../../components/parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {LogService} from '../logging/log.service';
import {SmartContract} from '../../models/smartcontract/smartcontract';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('AanmakenSmartcontractService', () => {
  let httpClientSpy: any;
  let logServiceSpy: any;
  let aanmakenSmartcontractService: AanmakenSmartcontractService;
  let smartContract: SmartContract;
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
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['get']);
    smartContract = new SmartContract();
    aanmakenSmartcontractService = new AanmakenSmartcontractService(httpClientSpy, logServiceSpy);
    spyOn(aanmakenSmartcontractService, 'maakContract');
  });

  it('moet worden aangemaakt', () => {
    const service: AanmakenSmartcontractService = TestBed.get(AanmakenSmartcontractService);
    expect(service).toBeTruthy();
  });
  // Dit is geen ding, moet replaced worden met daadwerkelijke button click, kan niet worden getest.

  // it('calls maakContract and HttpClient', () => {
  //   AanmakenSmartcontractService.maakContract(smartContract);
  //   expect(AanmakenSmartcontractService.maakContract(smartContract)).toHaveBeenCalled();
  // });
});
