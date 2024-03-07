import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  editing = false;
  editedUser: User | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.editedUser = { ...user }; // Clone user for editing
      }
    });
  }


editUser() {
  this.editing = true;
  // Create a clone of the user object for editing
  if (this.user) {
    this.editedUser = { ...this.user };
  }
}

cancelEdit() {
  this.editing = false;
  // Reset edited user object
  this.editedUser = null;
}

// saveUser(): void {
//   if (this.editedUser) {
//     // You may want to upload the CV file to the server here if needed

//     this.userService.updateUser(this.editedUser).subscribe(updatedUser => {
//       this.user = updatedUser;
//       this.editing = false;
//       this.userService.setLoggedInUser(updatedUser); // Update the logged-in user data
//     });
//   }
// }

saveUser(): void {
  if (this.editedUser) {
    this.userService.updateUserWithOutCv(this.editedUser).subscribe(updatedUser => {
      this.user = updatedUser;
      this.editing = false;
      this.userService.setLoggedInUser(updatedUser); // Update the logged-in user data
    });
  }
}



deleteUser() {
  if (confirm('Are you sure you want to delete your account?')) {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        // Handle successful deletion, such as navigation or logout
      });
    }
  }
}



}
