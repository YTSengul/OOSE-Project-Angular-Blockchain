import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private static ERROR = 'ERROR - ';
  private static INFO = 'INFO - ';
  private static WAARSCHUWING = 'WAARSCHUWING - ';

  public waarschuw(bericht: string, object?: any) {
    this.consoleLog(LogService.WAARSCHUWING, bericht, object);
  }

  public error(bericht: string, object?: any) {
    this.consoleLog(LogService.ERROR, bericht, object);
  }

  public info(bericht: string, object?: any) {
    this.consoleLog(LogService.INFO, bericht, object);
  }

  private consoleLog(niveau: string, bericht: string, object?: any): void {
    if (object) {
      console.log(niveau + bericht, object);
    } else {
      console.log(niveau + bericht);
    }
  }

  constructor() { }
}
