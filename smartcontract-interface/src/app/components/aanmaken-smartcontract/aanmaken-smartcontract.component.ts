import {Component, OnInit} from '@angular/core';
import { AanmakenSmartcontractService } from '../../services/aanmaken-smartcontract/aanmaken-smartcontract.service';
import { SmartContract } from '../../models/smartcontract/smartContract';
import { Parameter } from '../../models/parameter/parameter';
import {Onderwerp} from '../../models/onderwerp/onderwerp';

@Component({
  selector: 'app-aanmaken-smartcontract',
  templateUrl: './aanmaken-smartcontract.component.html',
  styleUrls: ['./aanmaken-smartcontract.component.css']
})
export class AanmakenSmartcontractComponent implements OnInit {
  public smartContract: SmartContract = {
    smartContractNaam: '',
    rootParameters: []
  };

  constructor(private aanmakenSmartContractService: AanmakenSmartcontractService) {}

  maakEersteParameter(): void {
    const parameter: Parameter = {
      parameterNummer: (this.smartContract.rootParameters.length + 1).toString(),
      onderwerp: new Onderwerp(),
      vergelijker: null,
      adviesKleur: null,
      waarde: null,
      kinderen: null,
      errors: null
    };
    this.smartContract.rootParameters.push(parameter);
  }

  private maakContractAan(): void {
    this.aanmakenSmartContractService.maakContract(this.smartContract);
  }

  ngOnInit(): void {
    this.maakEersteParameter();
  }
}
