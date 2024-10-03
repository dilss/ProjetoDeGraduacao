import { Plantation } from '../plantation/plantation.model';

export class Sensor {
  deviceEui: string;
  networkKey?: string;
  plantationId?: number;
  name: string;
  latitude: number;
  longitude: number;
  mostRecentMeasurementTimestamp?: string;
  plantation?: Plantation;
}
