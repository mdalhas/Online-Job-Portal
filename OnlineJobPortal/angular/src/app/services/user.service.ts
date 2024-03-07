
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { User } from '../model/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private apiUrl = 'http://localhost:8085/api/user';

//   private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

//   constructor(private http: HttpClient) {}

//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user).pipe(
//       catchError(this.handleError)
//     );
//   }

//   loginUser(userCredentials: { email: string, password: string }): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login`, userCredentials).pipe(
//       tap(user => this.setLoggedInUser(user)),
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('API Error:', error);

//     // Customize error handling based on your application needs
//     if (error.status === 401) {
//       // Handle unauthorized access (e.g., incorrect login credentials)
//     } else if (error.status === 403) {
//       // Handle forbidden access
//     }

//     return throwError('Something went wrong, please try again later.');
//   }

//   getLoggedInUser(): Observable<User | null> {
//     return this.loggedInUserSubject.asObservable();
//   }

//   setLoggedInUser(user: User): void {
//     this.loggedInUserSubject.next(user);
//   }

//   clearLoggedInUser(): void {
//     this.loggedInUserSubject.next(null);
//   }

//   // New method to get user ID
//   getLoggedInUserId(): number | null {
//     const user = this.loggedInUserSubject.getValue();
//     return user ? user.id : null;
//   }

//  // New method to get user by ID
//  getUserById(userId: number): Observable<User> {
//   return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
//     catchError(this.handleError)
//   );
// }

// getAllUsers(): Observable<User[]> {
//   return this.http.get<User[]>(this.apiUrl).pipe(
//     catchError(this.handleError)
//   );
// }


// deleteUser(id: number): Observable<void> {
//   return this.http.delete<void>(`${this.apiUrl}/${id}`)
//     .pipe(catchError(this.handleError));
// }


// updateUser(user: User): Observable<User> {
//   return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
//     tap(updatedUser => this.setLoggedInUser(updatedUser)),
//     catchError(this.handleError)
//   );
// }


// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8085/api/user';

  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(userCredentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, userCredentials).pipe(
      tap(user => this.setLoggedInUser(user)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);

    // Customize error handling based on your application needs
    if (error.status === 401) {
      // Handle unauthorized access (e.g., incorrect login credentials)
    } else if (error.status === 403) {
      // Handle forbidden access
    }

    return throwError('Something went wrong, please try again later.');
  }

  getLoggedInUser(): Observable<User | null> {
    return this.loggedInUserSubject.asObservable();
  }

  setLoggedInUser(user: User): void {
    this.loggedInUserSubject.next(user);
  }

  clearLoggedInUser(): void {
    this.loggedInUserSubject.next(null);
  }

  // New method to get user ID
  getLoggedInUserId(): number | null {
    const user = this.loggedInUserSubject.getValue();
    return user ? user.id : null;
  }

  // New method to get user by ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // updateUser(user: User, cvFile?: File): Observable<User> {
  //   const formData: FormData = new FormData();
  
  //   Object.keys(user).forEach(key => {
  //     (formData as FormData).append(key, (user as any)[key]);
  //   });
  
  //   if (cvFile) {
  //     formData.append('cvFile', cvFile, cvFile.name);
  //   }
  
  //   return this.http.put<User>(`${this.apiUrl}/${user.id}`, formData).pipe(
  //     tap(updatedUser => this.setLoggedInUser(updatedUser)),
  //     catchError(this.handleError)
  //   );
  // }

  updateUser(userId: number, user: User, cvFile?: File): Observable<User> {
    const formData: FormData = new FormData();
  
    Object.keys(user).forEach(key => {
      formData.append(key, (user as any)[key]);
    });
  
    if (cvFile) {
      formData.append('cvFile', cvFile, cvFile.name);
    }
  
    return this.http.put<User>(`${this.apiUrl}/${userId}`, formData).pipe(
      tap(updatedUser => this.setLoggedInUser(updatedUser)),
      catchError(this.handleError)
    );
  }
  
  
updateUserWithOutCv(user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/wOutCv/${user.id}`, user).pipe(
    tap(updatedUser => this.setLoggedInUser(updatedUser)),
    catchError(this.handleError)
  );
}
  
}
