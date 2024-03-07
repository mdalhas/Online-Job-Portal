// addjob.component.ts

import { Component, OnInit } from '@angular/core';

import { JobsService } from '../../services/jobs.service';
import { Jobs } from '../../model/jobs.model';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css'] // Fix the typo in styleUrls
})
export class AddjobComponent implements OnInit {
  jobs: Jobs[] = [];
  selectedJob: Jobs = new Jobs();

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.jobsService.getAllJobs().subscribe(jobs => this.jobs = jobs);
  }

  getJobById(id: number): void {
    this.jobsService.getJobById(id).subscribe(job => this.jobs = this.jobs);
  }

  createJob(): void {
    this.jobsService.createJob(this.selectedJob).subscribe(() => {
      this.resetForm();
      this.getAllJobs();
    });
  }

  updateJob(): void {
    this.jobsService.updateJob(this.selectedJob).subscribe(() => {
      this.resetForm();
      this.getAllJobs();
    });
  }

  deleteJob(id: number): void {
    this.jobsService.deleteJob(id).subscribe(() => {
      this.getAllJobs();
    });
  }

  resetForm(): void {
    this.selectedJob = new Jobs();
  }
}
