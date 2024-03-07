import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Jobs } from '../../model/jobs.model';
import { Router } from '@angular/router';  // Correct import statement

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Jobs[] = [];
  searchLocation: string = '';
  searchCategory: string = '';
  searchResults: Jobs[] = [];

  // Inject the Router in the constructor
  constructor(private jobsService: JobsService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  navigateToJobApplicantList(jobId: number): void {
    // Use the router to navigate to the desired route
    this.router.navigate(['/jobApplicantList', jobId]);
  }

  loadJobs(): void {
    this.jobsService.getAllJobs().subscribe(
      (data: Jobs[]) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  getRandomBackgroundColor(): string {
    // Add your logic to generate a random background color
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  onSearch(): void {
    if (this.searchLocation || this.searchCategory) {
      this.jobsService.searchJobs(this.searchLocation, this.searchCategory).subscribe(
        results => {
          this.searchResults = results;
        },
        error => {
          console.error('Error fetching search results:', error);
        }
      );
    } else {
      console.error('Both location and category are required for search.');
    }
  }

  resetSearch(): void {
    this.searchLocation = '';
    this.searchCategory = '';
    this.searchResults = [];
  }

  deleteJob(jobId: number): void {
    this.jobsService.deleteJob(jobId).subscribe(
      () => {
        this.jobs = this.jobs.filter(job => job.id !== jobId);
      },
      error => {
        console.error('Error deleting job:', error);
      }
    );
  }
}
