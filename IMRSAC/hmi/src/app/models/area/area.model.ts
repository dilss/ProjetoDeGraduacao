import { Soil } from "../soil/soil.model";
import { Coordinate } from "./coordinate.model";

export class Area {
    id?: number;
    name: string;
    soilId?: number;
    soil?: Soil;
    coordinates: Array<Coordinate> = [];
}