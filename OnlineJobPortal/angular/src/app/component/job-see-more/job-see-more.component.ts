import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jobs } from '../../model/jobs.model';
import { JobsService } from '../../services/jobs.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-see-more',
  templateUrl: './job-see-more.component.html',
  styleUrls: ['./job-see-more.component.css']
})
export class JobSeeMoreComponent implements OnInit, OnDestroy {
  job: Jobs | undefined;
  jobId!: number;
  hasApplied: boolean = false;
  isLoading: boolean = true; // Flag to indicate if the job details are being loaded

  constructor(
    private jobsService: JobsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params['id'];
      this.loadJob();
    });
  }

  ngOnDestroy(): void {
    this.hasApplied = false;
  }

  loadJob(): void {
    this.isLoading = true; // Set loading to true when starting to load job details
    this.jobsService.getJobById(this.jobId).subscribe(
      (data: Jobs) => {
        this.job = data;

        const userId = this.userService.getLoggedInUserId();
        if (userId) {
          this.jobsService.hasUserAppliedForJob(this.jobId, userId).subscribe(
            (response) => {
              this.hasApplied = response.applied;
              this.isLoading = false; // Set loading to false when job details are loaded
            },
            (error) => {
              console.error('Error checking application status:', error);
              this.isLoading = false; // Set loading to false on error
            }
          );
        } else {
          this.isLoading = false; // Set loading to false when user is not logged in
        }
      },
      (error) => {
        console.error('Error fetching job:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  applyForJob(jobId: number): void {
    const userId = this.userService.getLoggedInUserId();

    if (userId) {
      if (false) {
        this.snackBar.open('You have already applied for this job', 'Close', { duration: 3000 });
      } else {
         console.log(`Successfully applied for job ${jobId} by user ${userId}`);
        this.jobsService.applyForJob(jobId, userId).subscribe(
          () => {
            console.log(`Successfully applied for job ${jobId} by user ${userId}`);
            this.snackBar.open('Application done!', 'Close', { duration: 3000 });
            this.hasApplied = true;
          },
          (error) => {
            console.error('Error applying for job:', error);
            this.snackBar.open('Error applying for job', 'Close', { duration: 3000 });
          }
        );
      }
    } else {
      this.snackBar.open('User is not logged in', 'Close', { duration: 3000 });
      console.error('User is not logged in');
    }
  }
}
  