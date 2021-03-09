import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AppComponent} from '../../app.component';
import {OverzichtComponent} from '../overzicht/overzicht.component';
import {AanmakenSmartcontractComponent} from '../aanmaken-smartcontract/aanmaken-smartcontract.component';
import {ParameterComponent} from '../parameter/parameter.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('moet worden aangemaakt', () => {
    expect(component).toBeTruthy();
  });
});
