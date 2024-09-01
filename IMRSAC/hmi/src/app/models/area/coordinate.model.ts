export class Coordinate {
  latitude: number;
  longitude: number;
  nodeOrder: number;
  areaId?: number;
  constructor(
    latitude: number,
    longitude: number,
    nodeOrder: number,
    areaId: number
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.nodeOrder = nodeOrder;
    this.areaId = areaId;
  }
}
