import { Coordinate } from "./coordinate.model";

export class Area {
    id: string;
    name: string;
    points: Array<Coordinate> = [];
}