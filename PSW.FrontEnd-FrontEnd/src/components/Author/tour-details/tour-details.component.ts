import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { KeyPointService } from '../../../services/keypoint.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
})
export class TourDetailsComponent implements OnInit {
  tourId: number = 0;
  keypoints: any[] = [];

  constructor(
    private router: Router,
    private tourService: TourService,
    private keypointService: KeyPointService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.params['tourId'];

    this.keypointService.getAllKeyPointsForTour(this.tourId).subscribe(
      (keyPoints) => {
        this.keypoints = keyPoints;
        console.log('Key points: ' + JSON.stringify(this.keypoints));
      },
      (error) => {
        console.log('Error in fetching key points: ' + error);
      }
    );
  }

  publishTour() {
    if (this.keypoints.length < 2) {
      this.snackBar.open(
        'Tour needs to have 2 keypoints to be published',
        'Close',
        {
          duration: 2000,
        }
      );
      return;
    }

    this.snackBar.open('Tour published successfully', 'Close', {
      duration: 2000,
    });
  }

  archiveTour() {
    this.snackBar.open('Tour archived successfully', 'Close', {
      duration: 2000,
    });
  }
}
