import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected property name
})
export class SignupComponent {

  duplicateEmailError: string = '';
  constructor(private userService: UserService, private router:Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userData = form.value;
      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('User signed up successfully:', response);
          const userRole = form.value.role;
          if(userRole=='employer'){
            this.router.navigate(['/employer']);
          }
          else{
            this.router.navigate(['/homecomp']);
          }

          
          // Optionally, navigate to a login page or provide feedback to the user
        },
        (error) => {
          console.error('Error signing up:', error);
          // Handle errors and provide feedback to the user
          if (error.error && error.error.message === 'Duplicate email') {
            this.duplicateEmailError = 'Email already exists. Please try another email.';
          } else {
            this.duplicateEmailError = 'An error occurred. Please try again later.';
          }
        }
      );
    }
  }
}
