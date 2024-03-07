// job-application-list-component.component.ts

import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../../model/jobapplication.model';
import { JobapplicationService } from '../../services/jobapplication.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-application-list',
  templateUrl: './job-application-list-component.component.html',
  styleUrls: ['./job-application-list-component.component.css']
})

export class JobApplicationListComponent implements OnInit {
  jobApplications: JobApplication[] = [];
  jobId !: number ;
  userId !: number ;
  userName !: string ;
  jobTitle !: string ;
  // user list by job id
  userbyJob:User[]=[];

  users: User[] = [];

  constructor(
    private jobApplicationService: JobapplicationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private jobService:JobsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['jobId'];
      this.loadJobApplications();
      this.loadAllUsers();
      this.loadAllUsersByJobId(this.jobId)
    });
  }

  // private loadJobApplications(): void {
  //   if (!this.jobId) {
  //     console.error('Job ID is required.');
  //     return;
  //   }
  
  //   this.jobApplicationService.getApplicationForJob(this.jobId).subscribe(
  //     (applications: JobApplication[]) => {
        // Assuming you want to extract data from the first job application
        // if (applications.length > 0) {
        //   const application = applications[0]; // Extract data from the first application
        //   this.userName = application.user.name;
        //   this.jobTitle = application.job.title;
        // }
  
        // Assign the entire array to your component property
  //       this.jobApplications = applications;
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

  private loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  // load user by job id
  private loadAllUsersByJobId(jobid:number): void {
   this.jobService.getAllUserByJobs(jobid).subscribe({
    next:res=>{
      this.userbyJob= res;
      console.log(res)
      console.log(" inside method")
    },
    error:err=>
    { console.log(err)}
   })
  }
}
