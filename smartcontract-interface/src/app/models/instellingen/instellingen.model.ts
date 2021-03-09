import {Instellingen} from './instellingen.interface.model';

export class InstellingenImpl implements Instellingen {
  server: string;
  gebruiker: string;
  token: string;

  constructor() {
    this.server = '';
    this.gebruiker = '';
    this.token = '';
  }
}
