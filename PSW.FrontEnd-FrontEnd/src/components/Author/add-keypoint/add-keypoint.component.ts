import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { UploadService } from '../../../services/upload.service';
import { KeyPointService } from '../../../services/keypoint.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-keypoint',
  templateUrl: './add-keypoint.component.html',
  styleUrl: './add-keypoint.component.scss',
})
export class AddKeypointComponent implements OnInit {
  //properties
  latitude: number | undefined;
  longitude: number | undefined;
  kpName: string = '';
  kpDescription: string = '';
  kpImage: string = '';
  tourId: number = 0;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private keypointService: KeyPointService,
    private uploadService: UploadService,
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
    const file: File = event.target.files[0];
    if (file) {
      this.uploadService.uploadImage(file).subscribe({
        next: (response) => {
          this.kpImage = response.path;
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        },
      });
    }
  }

  onSubmit(): void {
    const kpData = {
      latitude: this.latitude,
      longitude: this.longitude,
      name: this.kpName,
      description: this.kpDescription,
      image: this.kpImage,
      tourId: this.tourId,
    };

    this.keypointService.createKeyPoint(kpData).subscribe({
      next: (response) => {
        this.snackBar.open('Key point created successfully', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/tour-details/', this.tourId]);
      },
      error: (error) => {
        console.error('Error creating key point:', error);
      },
    });
  }
}
