import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup = new FormGroup({}); // Initialize the form here
  userId: number | null = null;
  user: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      qualification: [''],
      cellNo: [''],
      gender: [''],
      dob: [''],
      image: [''],
      cvFileName: [''],
      cvContentType: [''],
      cvData: [''], // For displaying the old CV file
      cvFile: [null], // For CV file upload
      isEnable: [false],
      role: ['']
    });

    // Get user ID from route parameters
    const snapshot = this.activatedRoute.snapshot;
    this.userId = snapshot.params?.['userId'] ?? null;

    if (this.userId !== null) {
      // Fetch user data based on userId
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.userForm.patchValue(user);
      });
    }
  }

  // saveUser(): void {
  //   if (this.userForm.valid && this.user && this.userId !== null) {
  //     // Create FormData for file upload
  //     const formData = new FormData();
  //     const updatedUser: User = { ...this.user, ...this.userForm.value };

  //     // Append user data to FormData
  //     Object.keys(updatedUser).forEach(key => {
  //       if (key !== 'cvFile') {
  //         formData.append(key, updatedUser[key]);
  //       }
  //     });

  //     // Append CV file if provided
  //     const cvFile = this.userForm.get('cvFile')?.value;
  //     if (cvFile instanceof File) {
  //       formData.append('cvFile', cvFile, cvFile.name);
  //     }

  //     // Update user data including CV file
  //     this.userService.updateUser(updatedUser, formData).subscribe(updatedUserData => {
  //       // Handle success, e.g., show a success message
  //       console.log('User updated successfully:', updatedUserData);
  //     });
  //   }
  // }

  saveUser(): void {
    if (this.userForm.valid && this.user && this.userId !== null) {
      const updatedUser: User = { ...this.user, ...this.userForm.value };
      const cvFile = this.userForm.get('cvFile')?.value;
  
      this.userService.updateUser(this.userId, updatedUser, cvFile).subscribe(updatedUserData => {
        // Handle success, e.g., show a success message
        console.log('User updated successfully:', updatedUserData);
      });
    }
  }
  
}
