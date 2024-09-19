import { Plantation } from '../plantation/plantation.model';
import { Soil } from '../soil/soil.model';
import { Coordinate } from './coordinate.model';

import * as GeoJsonArea from '@mapbox/geojson-area';
import { Polygon as PolygonGeo, Position } from 'geojson';

export class Area {
  id?: number;
  name: string;
  area: number;
  coordinates: Coordinate[];
  soilId?: number;
  soil?: Soil;
  plantation?: Plantation;

  constructor(name: string, coordinates: Coordinate[]) {
    this.name = name;
    this.coordinates = coordinates;
    this.area = this.calculateAreInSquareMeters();
  }

  private calculateAreInSquareMeters(): number {
    let geo: PolygonGeo = {
      coordinates: [],
      type: 'Polygon',
    };
    let positions: Position[] = [];
    this.coordinates.forEach((coordinate) => {
      let position: Position = [coordinate.longitude, coordinate.latitude];
      positions.push(position);
    });
    geo.coordinates.push(positions);
    return GeoJsonArea.geometry(geo);
  }
}
