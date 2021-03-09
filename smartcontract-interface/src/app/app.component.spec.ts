import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {OverzichtComponent} from './components/overzicht/overzicht.component';
import {AanmakenSmartcontractComponent} from './components/aanmaken-smartcontract/aanmaken-smartcontract.component';
import {ParameterComponent} from './components/parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from './modules/material.module';

describe('AppComponent', () => {
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
      ],
    }).compileComponents();
  }));

  it('moet de applicatie aanmaken', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`moet 'smartcontract-interface' als titel hebben`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('smartContract.ts-interface');
  });

});
