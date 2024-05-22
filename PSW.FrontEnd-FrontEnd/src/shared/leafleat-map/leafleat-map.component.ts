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

    // Create and add polyline to the map
    this.polyline = L.polyline(latLngs, { color: 'purple' }).addTo(this.map);

    // Optional: fit the map to the polyline
    this.map.fitBounds(this.polyline.getBounds());
  }
}
