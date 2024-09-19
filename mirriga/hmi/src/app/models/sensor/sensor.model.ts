import { Plantation } from "../plantation/plantation.model";

export class Sensor {
    deviceEui: string;
    plantationId?: number
    name: string;
    latitude: number;
    longitude: number;
    plantation?: Plantation;
}