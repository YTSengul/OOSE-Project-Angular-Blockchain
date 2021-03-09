import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { AanmakenSmartcontractComponent } from './aanmaken-smartcontract.component';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header/header.component';
import {OverzichtComponent} from '../overzicht/overzicht.component';
import {ParameterComponent} from '../parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('AanmakenSmartcontractComponent', () => {
  let component: AanmakenSmartcontractComponent;
  let fixture: ComponentFixture<AanmakenSmartcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        OverzichtComponent,
        AanmakenSmartcontractComponent,
        ParameterComponent
      ],
      imports: [
         SmartContractInterfaceMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AanmakenSmartcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'maakEersteParameter').and.callThrough();
  });

  it('moet worden aangemaakt', () => {
    expect(component).toBeTruthy();
  });

  it('verwacht dat er iets wordt gepushed', function() {
    component.ngOnInit();
    expect(component.maakEersteParameter).toHaveBeenCalled();
  });
});
