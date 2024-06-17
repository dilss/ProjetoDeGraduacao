import { Coordinate } from "./coordinate.model";

export class Area {
    id?: number;
    name: string;
    coordinates: Array<Coordinate> = [];
}