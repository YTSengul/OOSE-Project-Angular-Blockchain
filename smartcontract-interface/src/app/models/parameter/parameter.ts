import {Onderwerp} from '../onderwerp/onderwerp';
import {Errors} from '../errors/error';

export class Parameter {
  parameterNummer: string;
  onderwerp: Onderwerp;
  vergelijker: string;
  adviesKleur: string;
  waarde: number;
  kinderen: Parameter[];
  errors: Errors[];
}

