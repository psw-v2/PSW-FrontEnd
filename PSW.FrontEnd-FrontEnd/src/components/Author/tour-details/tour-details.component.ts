import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent implements OnInit {
  tourId: number = 0;
  latitude: number | undefined;
  longitude: number | undefined;

  constructor(
    private router: Router,
    private tourService: TourService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.params['tourId'];

    //this.tourService.getTourById(this.tourId).subscribe((tour) => {});
  }

  onMapClick(coords: { lat: number; lng: number }) {
    this.latitude = coords.lat;
    this.longitude = coords.lng;
  }

  onFileSelected(event: any): void {
    // const file: File = event.target.files[0];
    // if (file) {
    //   this.uploadService.uploadImage(file).subscribe({
    //     next: (response) => {
    //       this.eventImage = response.path;
    //     },
    //     error: (error) => {
    //       console.error('Error uploading image:', error);
    //     },
    //   });
    // }
  }
}
