import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SmartContract} from '../../models/smartcontract/smartContract';
import {AppConstants} from '../../app.constants';
import {RestfulSmartcontractClientService} from '../restful-smartcontract-client/restful-smartcontract-client.service';
import {MaakContractResponse} from '../../models/maakContractResponse/maak-contract-response.model';
import {LogService} from '../logging/log.service';

@Injectable({
  providedIn: 'root'
})
export class AanmakenSmartcontractService extends RestfulSmartcontractClientService {
  private aanmaakUrl = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient, loggingService: LogService) {
    super(loggingService);
  }
  public maakContract(smartContract: SmartContract) {
    this.zetNieuweInstellingenIn(this.aanmaakUrl);
    this.verwerkContractAanvraag(smartContract);
  }
  private verwerkContractAanvraag(smartContract: SmartContract): void {
    const smartContractAanvraag = JSON.stringify(smartContract);
    const endpointUrl = this.maakEndpointUrl(AppConstants.API_MAAKCONTRACT);
    this.httpClient.post<MaakContractResponse>(endpointUrl, smartContractAanvraag, {headers: this.headers})
    .subscribe(data => this.verwerkContractAntwoord(data), err => this.verwerkContractErrors(err));
  }
  private verwerkContractAntwoord(antwoord: MaakContractResponse): void {
    if (antwoord) {
      this.werkInstellingenBij(antwoord.token);
    } else {
      this.loggingService.error('Er is iets mis gegaan met het antwoord van de server. ' +
      'Heeft uw server de goede json gegeven?');
      this.maakOpslagVrij();
    }
  }
  private verwerkContractErrors(error: HttpErrorResponse): void {
    this.verwerkErrors(error);
    this.maakOpslagVrij();
  }
}
