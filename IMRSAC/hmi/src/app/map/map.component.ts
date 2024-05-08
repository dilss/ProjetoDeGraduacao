import { Component } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Icon, latLng, tileLayer } from 'leaflet';

Icon.Default.imagePath = 'leaflet/';
@Component({
  imports: [LeafletModule],
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&amp;copy; OpenStreetMap contributors'
      })
    ],
    zoom: 18,
    center: latLng([ -23.010426715414685, -45.57926527454545 ])
  };
}