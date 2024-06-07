import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
//import * as L from 'leaflet';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  private map!: L.Map;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((L) => {
        //this.initMap(L);
      });
      this.initMap(L);
    }
  }

  private initMap(L: any): void {
    let mapOptions = {
      center: [41.72289047345559, 1.8339146297444697],
      zoom: 16,
    };

    let iconMarker = L.icon({
      iconUrl: '../../../../assets/images/marker.png',
      iconSize: [45, 45],
    });

    let markerOptions = {
      title: 'Janna',
      clickable: true,
      icon: iconMarker,
    };

    let globalMap = 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
    let map = new L.map('map', mapOptions);
    let layer = new L.TileLayer(globalMap);
    let marker = new L.Marker(mapOptions.center, markerOptions);

    map.addLayer(layer);
    marker.addTo(map);
  }
}
