import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Jobs } from '../model/jobs.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly apiUrl = 'http://localhost:8085/api/jobs'; // Replace with your actual API endpoint

  constructor(private http: HttpClient,   private snackBar: MatSnackBar) { }

  getAllJobs(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  
  getJobById(id: number): Observable<Jobs> {
    return this.http.get<Jobs>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createJob(job: Jobs): Observable<Jobs> {
    return this.http.post<Jobs>(this.apiUrl, job)
      .pipe(catchError(this.handleError));
  }

  updateJob(job: Jobs): Observable<Jobs> {
    return this.http.put<Jobs>(`${this.apiUrl}/${job.id}`, job)
      .pipe(catchError(this.handleError));
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchJobs(location: string, category: string): Observable<Jobs[]> {
    const params = new HttpParams().set('location', location).set('category', category);
    return this.http.get<Jobs[]>(`${this.apiUrl}/searchjob`, { params })
      .pipe(catchError(this.handleError));
  }

  // applyForJob(jobId: number, userId: number): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/${jobId}/apply`, { userId })
  //     .pipe(catchError(this.handleError));
  // }

  applyForJob(jobId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${jobId}/apply`, { userId })
      .pipe(
        catchError((error) => {
          console.error('Error applying for job:', error);
  
          // if (error instanceof HttpErrorResponse && error.error instanceof ProgressEvent) {
          //   // Handle cases where the response is not valid JSON (e.g., HTML response)
          //   console.log('Raw response:', error.message);
          //   this.snackBar.open('Unexpected response from the server', 'Close', { duration: 3000 });
          // } else {
          //   // Handle other types of errors
          //   console.log('Raw response:', error.error);
          //   this.snackBar.open('Error applying for job', 'Close', { duration: 3000 });
          // }
  
          return throwError('Something went wrong, please try again later.');
        })
      );
  }
  
  
  

  hasUserAppliedForJob(jobId: number, userId: number): Observable<{ applied: boolean }> {
    return this.http.get<{ applied: boolean }>(`${this.apiUrl}/${jobId}/hasApplied`, { params: { userId: userId.toString() } })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);

    // Customize error handling based on your application needs
    if (error.status === 401) {
      // Handle unauthorized access
    } else if (error.status === 404) {
      // Handle not found
    }

    return throwError('Something went wrong, please try again later.');
  }
  // get user list by job id
  getAllUserByJobs(jobId:number):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/has_applied_list/${jobId}`);
  }
}
