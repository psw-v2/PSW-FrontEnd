import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-leafleat-map',
  templateUrl: './leafleat-map.component.html',
  styleUrl: './leafleat-map.component.scss',
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;
  @Input() keypoints: any[] = [];

  map!: L.Map;
  markers: L.Marker[] = [];
  private polyline?: L.Polyline;
  private control?: L.Routing.Control;

  ngOnInit() {
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  ngOnDestroy() {
    this.map.remove();
  }

  ngOnChanges() {
    if (this.keypoints) {
      this.addKeypointMarkers(); // Function to add markers for all keypoints
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'PSW Tourist Agency',
    }).addTo(this.map);
  }

  private addKeypointMarkers(): void {
    const customIcon = L.icon({
      iconUrl:
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Clear existing markers and remove old polyline if exists
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    if (this.polyline) {
      this.polyline.remove(); // Remove existing polyline
    }

    const latLngs: L.LatLng[] = []; // Array to hold latitude and longitude of keypoints

    // Add new markers with tooltips
    this.keypoints.forEach((kp) => {
      const latLng = L.latLng(kp.latitude, kp.longitude);
      latLngs.push(latLng); // Add latLng to the array for the polyline

      const marker = L.marker(latLng, {
        icon: customIcon,
      }).addTo(this.map);

      // Add a tooltip to the marker
      marker.bindTooltip(kp.name, {
        permanent: true, // This makes the tooltip always visible
        direction: 'top', // This positions the tooltip above the marker
        offset: L.point(0, -40), // Adjusts the position of the tooltip relative to the marker
      });

      this.markers.push(marker);
    });

    this.control = L.Routing.control({
      waypoints: latLngs,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      lineOptions: {
        styles: [{ color: 'purple', opacity: 0.75, weight: 3 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0.02,
      },
    }).addTo(this.map);

    this.control.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
      const route: L.LatLng[] = e.routes[0].coordinates || [];
      const bounds = L.latLngBounds(route);
      this.map.fitBounds(bounds);
    });
  }
}
