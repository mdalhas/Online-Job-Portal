import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './component/jobs/jobs.component';
import { UserComponent } from './component/user/user.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddjobComponent } from './component/addjob/addjob.component';
import { EditJobComponent } from './component/edit-job/edit-job.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { JobSeeMoreComponent } from './component/job-see-more/job-see-more.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JobApplicationListComponent } from './component/job-application-list-component/job-application-list-component.component';

import { ApplicantlistComponent } from './component/applicantlist/applicantlist.component';
import { EmployerComponent } from './component/employer/employer.component';
import { ViewalljobComponent } from './component/viewalljob/viewalljob.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { MatNativeDateModule } from '@angular/material/core';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { ShowcvComponent } from './component/showcv/showcv.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ViewalljobComponent,
    AddjobComponent,
    EditJobComponent,
    SignupComponent,
    LoginComponent,
    JobSeeMoreComponent,
   ApplicantlistComponent,
    JobApplicationListComponent,
    EmployerComponent,
    UserProfileComponent,
    UserEditComponent,
    UploadFileComponent,
    ShowcvComponent,
  
        
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,




    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    

  ],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
export class ViewalljobModule {}
