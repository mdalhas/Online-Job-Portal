import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../model/jobs.model';
import { JobsService } from '../../services/jobs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewalljob',
  templateUrl: './viewalljob.component.html',
  styleUrl: './viewalljob.component.css'
})
export class ViewalljobComponent implements OnInit {

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

 
}
