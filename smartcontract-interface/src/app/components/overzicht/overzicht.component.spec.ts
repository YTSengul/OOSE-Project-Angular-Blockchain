import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverzichtComponent } from './overzicht.component';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header/header.component';
import {AanmakenSmartcontractComponent} from '../aanmaken-smartcontract/aanmaken-smartcontract.component';
import {ParameterComponent} from '../parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';

describe('OverzichtComponent', () => {
  let component: OverzichtComponent;
  let fixture: ComponentFixture<OverzichtComponent>;

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
    fixture = TestBed.createComponent(OverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('moet worden aangemaakt', () => {
    expect(component).toBeTruthy();
  });
});
