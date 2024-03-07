import { HttpClient, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('fileHasan', file);
  
    return this.http.post(this.apiUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => this.getUploadProgress(event)),
      filter((progress: number | null): progress is number => progress !== null) // Filter out null values
    );
  }



  private getUploadProgress(event: HttpEvent<any>): number | null {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((event.loaded / event.total!) * 100); // Use optional chaining here
      return percentDone;
    }
    return null;
  }

  getFiles(): Observable<any> {
    return this.http.get<File[]>(this.apiUrl + '/files');
  }


  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    return this.http.get(this.apiUrl + `/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
