import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ParameterComponent } from './parameter.component';
import {Parameter} from '../../models/parameter/parameter';
import {SmartContract} from '../../models/smartcontract/smartcontract';
import {AanmakenSmartcontractComponent} from '../aanmaken-smartcontract/aanmaken-smartcontract.component';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header/header.component';
import {OverzichtComponent} from '../overzicht/overzicht.component';
import {SmartContractInterfaceMaterialModule} from '../../modules/material.module';
import {Onderwerp} from '../../models/onderwerp/onderwerp';

describe('ParameterComponent', () => {
  let component: ParameterComponent;
  let fixture: ComponentFixture<ParameterComponent>;

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
      providers: [AanmakenSmartcontractComponent, ParameterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterComponent);
    component = fixture.componentInstance;
    component.smartContract = new SmartContract();
    const param = new Parameter();
    component.huidigeParameter = param;
    component.voogdParameter = param;
    component.smartContract.rootParameters = [];
    component.smartContract.rootParameters.push(param);
    fixture.detectChanges();
  });

  it('moet worden aangemaakt', () => {
    expect(component).toBeTruthy();
  });

  it('zal bepalen of parameter voorvader is of niet', () => {
    const contract = new SmartContract();
    const onderwerp1: Onderwerp = {
      naam: 'Boom',
      type: 'Hoogte'
    };
    const param: Parameter = {
      parameterNummer: '1.1',
      onderwerp: onderwerp1,
      vergelijker: '<',
      adviesKleur: 'rood',
      waarde: 1,
      kinderen: [],
      errors: null
    };
    contract.rootParameters = [];
    contract.rootParameters.push(param);
    component.smartContract = contract;

    expect(component.huidigeParameterIsVoorvader(param)).toBe(true);
  });

  it('zal een parameter in nieuwe laag stoppen', () => {
    const contract = new SmartContract();
    const param1: Parameter = {
      parameterNummer: '1',
      onderwerp: null,
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: null
    };
    contract.rootParameters = [];
    contract.rootParameters.push(param1);
    component.smartContract = contract;

    component.nieuwParameterInNieuwLaag(param1);
    expect(param1.kinderen).not.toEqual(null);
  });

  it('zal een parameter in nieuwe laag stoppen', () => {
    const contract = new SmartContract();
    const param1: Parameter = {
      parameterNummer: '1',
      onderwerp: null,
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: null
    };
    contract.rootParameters = [];
    contract.rootParameters.push(param1);
    component.smartContract = contract;



    component.nieuwParameterInNieuwLaag(param1);
    expect(param1.kinderen[0].parameterNummer).toEqual('1.1');
    });

  it('zal een parameter in een laag stoppen waar al een parameter in zit', () => {
    const contract = new SmartContract();
    const param1: Parameter = {
      parameterNummer: '1',
      onderwerp: null,
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: []
    };
    contract.rootParameters = [];
    contract.rootParameters.push(param1);
    component.smartContract = contract;

    const param2: Parameter = {
      parameterNummer: '1.1',
      onderwerp: null,
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: null
    };
    contract.rootParameters = [];
    contract.rootParameters.push(param2);
    component.smartContract = contract;
    param1.kinderen.push(param2);
    component.nieuwParameterInNieuwLaag(param1);
    expect(param1.kinderen[1].parameterNummer).toEqual('1.2');
  });

  it('zal een nieuwe parameter maken', () => {
    const parameter = new Parameter();
    component.smartContract.rootParameters = [];
    component.smartContract.rootParameters.push(parameter);
    component.nieuwParameter(parameter);

    expect(component.smartContract.rootParameters).toContain(parameter);
    });

  it ('verwijder de parameter wanneer parameter voorvader is', () => {
    const parameter = new Parameter();
    const parameter2 = new Parameter();
    component.smartContract.parameters = [];
    component.smartContract.parameters.push(parameter);
    component.smartContract.parameters.push(parameter2);

    component.huidigeParameter = parameter;

    component.verwijderParameter(parameter);

    expect(component.smartContract.parameters[1]).toEqual(undefined);

  });

  it('verwijder de parameter wanneer parameter kind is', () => {
  const parameter = new Parameter();
  parameter.naam = '1';
  const kindParameter = new Parameter();
  kindParameter.naam = '1.1';
  parameter.kinderen = [];
  parameter.kinderen.push(kindParameter);
  component.voogdParameter = parameter;
  component.huidigeParameter = kindParameter;

  component.verwijderParameter(kindParameter);

  expect(component.voogdParameter.kinderen[0]).toEqual(undefined);
  });

  it('zal de index van de tweede (hoofd)parameter goed meegeven', () => {
    const contract = new SmartContract();
    const parameters: Parameter[] = [
      {parameterNummer: '1',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      },
      {parameterNummer: '2',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      },
      {parameterNummer: '3',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      }
      ];

    contract.rootParameters = parameters;
    component.smartContract = contract;

    const result = ParameterComponent.geefParameterIndex(parameters[1], component.smartContract.parameters);
    const expected = 1;

    expect(result === expected).toBe(true);
  });

  it('zal de index van de twee (kind)parameter goed meegeven', () => {
    const contract = new SmartContract();
    const kindParameters: Parameter[] = [
      {parameterNummer: '2.1',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      },
      {parameterNummer: '2.2',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      },
      {parameterNummer: '2.3',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      }
    ];
    const parameters: Parameter[] = [
      {parameterNummer: '1',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      },
      {parameterNummer: '2',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: kindParameters,
        errors: null
      },
      {parameterNummer: '3',
        onderwerp: null,
        vergelijker: null,
        adviesKleur: null,
        waarde: null,
        kinderen: [],
        errors: null
      }
    ];

    contract.rootParameters = parameters;
    component.smartContract = contract;

    const result = ParameterComponent.geefParameterIndex(kindParameters[1], component.smartContract.rootParameters[1].kinderen);
    const expected = 1;

    expect(result === expected).toBe(true);
  });
});
