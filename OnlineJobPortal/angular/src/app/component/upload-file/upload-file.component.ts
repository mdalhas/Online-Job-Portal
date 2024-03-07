import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'] // Fix styleUrl to styleUrls
})
export class UploadFileComponent {

  selectedFile: File | null = null; // Initialize selectedFile
  uploadProgress: number | null = null; // Initialize uploadProgress
  files: any = [];

  constructor(private fileService: FileService, private router: Router) { }

  ngOnInit(): void {
    this.getFiles();
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile)
        .subscribe(progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            alert("File upload completed")
            this.router.navigate(['/']);
            // File upload completed
            this.selectedFile = null;
          }
        });
    }
  }



  getFiles(): void {
    this.fileService.getFiles().subscribe(
      (response: any[]) => {
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.data;
          this.files.push(element);
        });
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }


  downloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe(response => {
      if (response.body) {
        const fileNameFromUrl = "file";
        const contentType = response.headers.get("Content-Type");
        
        // Ensure contentType is not null
        const blob = new Blob([response.body], { type: contentType || undefined });
  
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileNameFromUrl;
  
        link.click();
  
        window.URL.revokeObjectURL(link.href);
        link.remove();
      } else {
        console.log("Unable to extract file");
      }
    });
  }
  
  



  
}
