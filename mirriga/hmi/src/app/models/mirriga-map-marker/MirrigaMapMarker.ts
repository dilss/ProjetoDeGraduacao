import { Marker } from 'leaflet';

export class MirrigaSensorMarker extends Marker {
  markerId: string;

  setMirrigaId(sensorEui: string) {
    this.markerId = sensorEui;
  }

  getMirrigaId() {
    return this.markerId;
  }
}
