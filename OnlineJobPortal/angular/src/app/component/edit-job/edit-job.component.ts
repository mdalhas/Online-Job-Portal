// edit-job.component.ts
import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../model/jobs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  editedJob: Jobs = {
    id: 0,
    title: '',
    description: '',
    location: '',
    category: '',
    status: '',
    pdate: new Date(),
    deadlinedate: new Date(),
    jobApplications: []
  };

  editJobForm: NgForm = {} as NgForm;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;

    if (paramMap) {
      const jobIdString = paramMap.get('id');

      if (jobIdString !== null) {
        const jobId = +jobIdString;
        // Now you can use jobId safely
        console.log('Job ID:', jobId);

        // Fetch the job details using the service
        this.jobsService.getJobById(jobId).subscribe(
          (job: Jobs) => {
            this.editedJob = job;
          },
          (error) => {
            console.error('Error fetching job details:', error);
          }
        );
      } else {
        // Handle the case where 'id' is null
        console.error('Job ID is null');
      }
    } else {
      // Handle the case where paramMap is null or undefined
      console.error('paramMap is null or undefined');
    }
  }

  onSubmit(): void {
    // Update the job using the JobsService
    this.jobsService.updateJob(this.editedJob).subscribe(
      () => {
        // Job updated successfully, navigate back to the job details page
        this.router.navigate(['/userViewSeeMore', this.editedJob.id]);
      },
      error => {
        console.error('Error updating job:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
