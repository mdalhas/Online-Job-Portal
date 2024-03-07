// jobapplication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../model/jobapplication.model';

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {
  private apiUrl = 'http://localhost:8085/api/jobs'; 
  constructor(private http: HttpClient) {}

  getApplicationForJob(jobId: number): Observable<JobApplication[]> {
    const url = `${this.apiUrl}/${jobId}/applicants`;
    return this.http.get<JobApplication[]>(url);
  }

}
