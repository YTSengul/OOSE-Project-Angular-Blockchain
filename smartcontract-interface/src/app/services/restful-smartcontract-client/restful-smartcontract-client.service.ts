import {Injectable} from '@angular/core';
import {AppConstants} from '../../app.constants';
import {InstellingenImpl} from '../../models/instellingen/instellingen.model';
import {Instellingen} from '../../models/instellingen/instellingen.interface.model';
import {Subject} from 'rxjs';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LogService} from '../logging/log.service';

@Injectable()
export class RestfulSmartcontractClientService {

  private instellingenAangepast = new Subject<Instellingen>();
  private restError = new Subject<number>();
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public loggingService: LogService) {
    this.zetLokaleOpslagLuisteraarsAan();
  }
  protected zetNieuweInstellingenIn(serverUrl: string): void {
    const instellingen = new InstellingenImpl();
    instellingen.server = serverUrl;
    this.aanhouden(instellingen);
  }
  protected maakEndpointUrl(path: string): string {
    return this.haalOp().server + path;
  }
  protected werkInstellingenBij(token: string): void {
    const instellingen = this.haalOp();
    instellingen.token = token;

    this.aanhouden(instellingen);
  }
  private aanhouden(instellingen: Instellingen): void {
    localStorage.setItem(AppConstants.LOKAAL_OPSLAG_SLEUTEL_INSTELLINGEN, JSON.stringify(instellingen));
    this.instellingenAangepast.next(instellingen);
  }
  protected verwerkErrors(error: HttpErrorResponse): void {
    this.loggingService.info('A http Error has occured: ', error);
    this.restError.next(error.status);
  }
  protected maakOpslagVrij(): void {
    localStorage.removeItem(AppConstants.LOKAAL_OPSLAG_SLEUTEL_INSTELLINGEN);
    this.instellingenAangepast.next(undefined);
  }
  private haalOp(): Instellingen {
    const json = localStorage.getItem(AppConstants.LOKAAL_OPSLAG_SLEUTEL_INSTELLINGEN);

    if (json) {
      return JSON.parse(json);
    } else {
      return new InstellingenImpl();
    }
  }
  private verwerkOpslagBijwerking(event: StorageEvent): void {
    if (event.key === AppConstants.LOKAAL_OPSLAG_SLEUTEL_INSTELLINGEN) {
      this.instellingenAangepast.next(JSON.parse(event.newValue));
    }
  }
  private zetLokaleOpslagLuisteraarsAan(): void {
    window.addEventListener(
      AppConstants.OPSLAG_ACTIVITEIT_LUISTERAAR_SLEUTEL,
      (event: StorageEvent) => this.verwerkOpslagBijwerking(event));
  }
}
