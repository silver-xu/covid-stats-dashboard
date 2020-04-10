import { State } from './State';

export interface Country {
  name: string;
  geoName: string;
  code: string;
  states: State[];
}
