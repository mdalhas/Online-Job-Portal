import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:UserService, private router: Router){}

  // 
  onSubmit(form: NgForm) {
    if (form.valid) {
      const userCredentials = form.value;
      
      this.userService.loginUser(userCredentials).subscribe(
        (response:User) => {
          console.log('User logged in successfully:', response);
          // Optionally, navigate to another page or perform other actions
          if(response.role==='employer'){
            this.router.navigate(['/employer']);

          }else{
            this.router.navigate(['/homecomp']);
          }
        },
        (error) => {
          console.error('Error logging in:', error);
          // Handle errors and provide feedback to the user
        }
      );
    }
  }
}
