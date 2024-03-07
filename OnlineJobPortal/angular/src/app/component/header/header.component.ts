import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements  OnInit {



  loggedInUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to changes in the logged-in user
    this.userService.getLoggedInUser().subscribe(
      (user) => {
        this.loggedInUser = user;
      }
    );
  }

  logout(): void {
    // Clear the logged-in user when logging out
    this.userService.clearLoggedInUser();
  }

}
