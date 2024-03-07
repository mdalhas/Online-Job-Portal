import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../../model/jobapplication.model';
import { JobapplicationService } from '../../services/jobapplication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicantlist',
  templateUrl: './applicantlist.component.html',
  styleUrl: './applicantlist.component.css'
})
export class ApplicantlistComponent implements OnInit {
  jobApplications: JobApplication[] = [];
  jobId !: number ;
  userId !: number ;
  userName !: string ;
  jobTitle !: string ;

  constructor(
    private jobApplicationService: JobapplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['jobId'];
      this.loadJobApplications();
    });
  }

  // private loadJobApplications(): void {
  //   if (!this.jobId) {
  //     console.error('Job ID is required.');
  //     return;
  //   }

  //   this.jobApplicationService.getApplicationForJob(this.jobId).subscribe(
  //     (applications: JobApplication[]) => {
  //       this.jobApplications = applications;
  //       console.log(this.jobApplications)
  //     },
  //     error => {
  //       console.error('Error fetching job applications:', error);
  //     }
  //   );
  // }
  private loadJobApplications(): void {
    if (!this.jobId) {
      console.error('Job ID is required.');
      return;
    }
  
    this.jobApplicationService.getApplicationForJob(this.jobId).subscribe(
      (applications: JobApplication[]) => {
        // Assuming you want to extract data from the first job application
        if (applications.length > 0) {
          const application = applications[0]; // Extract data from the first application
          // this.userId = application.user.id;
          this.userName = application.user.name;
          this.jobTitle = application.job.title;
        }
  
        // Assign the entire array to your component property
        this.jobApplications = applications;
      },
      error => {
        console.error('Error fetching job applications:', error);
      }
    );
  }

}

