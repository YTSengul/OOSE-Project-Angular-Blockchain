import {Component, Input} from '@angular/core';
import {Opties} from '../../interfaces/opties';
import {Stoplicht} from '../../interfaces/stoplicht';
import {Parameter} from '../../models/parameter/parameter';
import {SmartContract} from '../../models/smartcontract/smartcontract';
import {Onderwerp} from '../../models/onderwerp/onderwerp';

@Component({
  selector: 'app-tree-children',
  templateUrl: './parameter.component.html'
})

export class ParameterComponent {

  @Input()
  public smartContract: SmartContract;
  @Input()
  public huidigeParameter: Parameter;
  @Input()
  public voogdParameter: Parameter;

  categorieen: Opties [] = [
    {waarde: 'Boom', toonWaarde: 'Boom'},
    {waarde: 'Station', toonWaarde: 'Station'}
  ];

  parameters: Opties[] = [
    {waarde: 'Afstand', toonWaarde: 'Afstand'},
    {waarde: 'Hoogte', toonWaarde: 'Hoogte'},
    {waarde: 'Breedte', toonWaarde: 'Breedte'},
    {waarde: 'Leeftijd', toonWaarde: 'Leeftijd'}
  ];

  operatoren: Opties[] = [
    {waarde: '<', toonWaarde: 'Kleiner dan'},
    {waarde: '>', toonWaarde: 'Groter dan'}
  ];

  stoplichtKleuren: Stoplicht[] = [
    {waarde: 1, klasse: 'groen'},
    {waarde: 2, klasse: 'oranje'},
    {waarde: 3, klasse: 'rood'},
    {waarde: 4, klasse: 'wit'}
  ];

  static geefParameterIndex(parameter: Parameter, family: Parameter[]): number {
    let index: number;
    for (const param of family) {
      if (parameter === param) {
        index = family.indexOf(param);
      }
    }
    return index;
  }

  public nieuwParameter(dezeParameter: Parameter): void {
    let doopNaam: string;
    let stiefFamilie;
    if (this.huidigeParameterIsVoorvader(dezeParameter)) {
      doopNaam = (this.smartContract.rootParameters.length + 1).toString();
      stiefFamilie = this.smartContract.rootParameters;
    } else {
      doopNaam = (this.voogdParameter.parameterNummer + '_' + (this.voogdParameter.kinderen.length + 1).toString());
      stiefFamilie = this.voogdParameter.kinderen;
    }

    const parameter: Parameter = {
      parameterNummer: doopNaam,
      onderwerp: new Onderwerp(),
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: []
    };
    stiefFamilie.push(parameter);
  }

  public nieuwParameterInNieuwLaag(dezeParameter: Parameter): void {
    let aantalKinderen = 1;
    if (dezeParameter.kinderen != null) {
      aantalKinderen += dezeParameter.kinderen.length;
    }
    const kindParameter: Parameter = {
      parameterNummer: dezeParameter.parameterNummer + '_' + aantalKinderen,
      onderwerp: new Onderwerp(),
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: [],
      errors: []
    };
    if (dezeParameter.kinderen == null) {
      dezeParameter.kinderen = [];
    }
    dezeParameter.kinderen.push(kindParameter);
  }

  private parameterMagVerwijderdWorden(origineleParameter: Parameter): boolean {
    return !(this.huidigeParameterIsVoorvader(origineleParameter) && this.smartContract.parameters.length === 1);
  }

  huidigeParameterIsVoorvader(dezeParameter: Parameter): boolean {
    for (const parameter of this.smartContract.rootParameters) {
      if (dezeParameter === parameter) {
        return true;
      }
    }
    return false;
  }

  public verwijderParameter(dezeParameter: Parameter): void {
    if (this.huidigeParameterIsVoorvader(dezeParameter)) {
      this.hernoemParameter(this.huidigeParameter);
      this.verwijderVoorvaderParameter(this.huidigeParameter);
    } else {
      this.hernoemParameter(this.huidigeParameter);
      this.verwijderKindParameter(this.huidigeParameter);
    }
  }

  private verwijderVoorvaderParameter(dezeParameter: Parameter): void {
    for (const parameter of this.smartContract.rootParameters) {
      if (dezeParameter === parameter) {
        const index = this.smartContract.rootParameters.indexOf(parameter);
        this.smartContract.rootParameters.splice(index, 1);
      }
    }
  }

  private hernoemParameter(origineleParameter: Parameter): void {
    let familie: Parameter[];
    if (this.huidigeParameterIsVoorvader(origineleParameter)) {
      familie = this.smartContract.rootParameters;
    } else {
      familie = this.voogdParameter.kinderen;
    }
    const donorNaam = origineleParameter.naam;
    const ontvangerIndex = ParameterComponent.geefParameterIndex(origineleParameter, familie) + 1;
    if (ontvangerIndex < familie.length) {
      this.hernoemParameter(familie[ontvangerIndex]);
      familie[ontvangerIndex].parameterNummer = donorNaam;
      if (familie[ontvangerIndex].kinderen != null) {
        this.hernoemKinderen(familie[ontvangerIndex]);
      }
    }
  }

  private hernoemKinderen(voogdParameter: Parameter): void {
    const voogdName = voogdParameter.parameterNummer;
    for (const kind of voogdParameter.kinderen) {
      const kindNummer = voogdParameter.kinderen.indexOf(kind) + 1;
      kind.parameterNummer = voogdName + '.' + kindNummer;
      if (kind.kinderen != null) {
        this.hernoemKinderen(kind);
      }
    }
  }

  private verwijderKindParameter(dezeParameter: Parameter): void {
    for (const parameter of this.voogdParameter.kinderen) {
      if (dezeParameter === parameter) {
        const index = this.voogdParameter.kinderen.indexOf(parameter);
        this.voogdParameter.kinderen.splice(index, 1);
      }
    }
  }
}
