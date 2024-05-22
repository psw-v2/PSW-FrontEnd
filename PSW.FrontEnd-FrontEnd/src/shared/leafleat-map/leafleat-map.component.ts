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
import 'leaflet-routing-machine'; // Import the routing machine
import { Routing } from 'leaflet';

@Component({
  selector: 'app-leafleat-map',
  templateUrl: './leafleat-map.component.html',
  styleUrl: './leafleat-map.component.scss',
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;
  @Output() mapClick = new EventEmitter<{ lat: number; lng: number }>(); // Event emitter for map clicks
  @Input() keypoints: any[] = [];

  map!: L.Map;
  markers: L.Marker[] = [];
  private polyline?: L.Polyline;
  private routingControl?: L.Routing.Control;

  ngOnInit() {
    this.initMap();
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
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Add click listener
    this.map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // Emit the coordinates on click
      this.mapClick.emit({ lat, lng });
      // Add a marker at the clicked location
      this.addMarker(lat, lng);
    });
  }

  private addMarker(lat: number, lng: number): void {
    // Remove previous markers if you only want one marker at a time
    this.markers.forEach((marker) => {
      marker.remove();
    });

    // Create a custom icon
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

    // Create and add the new marker with the custom icon
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    this.markers = [marker]; // Store the marker if you need to reference it later
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

    // Clear existing markers and any previous routing controls
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    if (this.routingControl) {
      this.routingControl.removeFrom(this.map);
      this.routingControl = undefined;
    }

    // Initialize routing control with the waypoints from keypoints
    this.routingControl = L.Routing.control({
      waypoints: this.keypoints.map((kp) =>
        L.latLng(kp.latitude, kp.longitude)
      ),
      routeWhileDragging: true,
      createMarker: (i: number, waypoint: L.Routing.Waypoint, n: number) => {
        const marker = L.marker(waypoint.latLng, {
          icon: customIcon,
        }).bindTooltip(this.keypoints[i].name, {
          permanent: true,
          direction: 'top',
          offset: L.point(0, -40),
        });
        this.markers.push(marker);
        return marker;
      },
    }).addTo(this.map);

    this.routingControl.on('routesfound', (e: L.Routing.RoutingResultEvent) => {
      var routes = e.routes;
      var summary = routes[0].summary;
      // Adjust map bounds or log summary here
      this.map.fitBounds(
        L.latLngBounds(
          this.keypoints.map((kp) => L.latLng(kp.latitude, kp.longitude))
        )
      );
    });
  }
}
