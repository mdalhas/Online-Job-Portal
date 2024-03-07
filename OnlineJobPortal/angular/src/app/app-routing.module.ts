import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './component/jobs/jobs.component';
import { ViewalljobComponent } from './component/viewalljob/viewalljob.component';
import { HomeComponent } from './component/home/home.component';
import { AddjobComponent } from './component/addjob/addjob.component';
import { EditJobComponent } from './component/edit-job/edit-job.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { JobSeeMoreComponent } from './component/job-see-more/job-see-more.component';
import { JobApplicationListComponent } from './component/job-application-list-component/job-application-list-component.component';
import { EmployerComponent } from './component/employer/employer.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { ShowcvComponent } from './component/showcv/showcv.component';

const routes: Routes = [
   { path: 'userHomeViewpage', component: JobsComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'homecomp', component: HomeComponent },
  { path: 'addjob', component: AddjobComponent },
  { path: 'editJob/:id', component: EditJobComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'seemorejobdetails/:id', component:JobSeeMoreComponent},
  {path:'jobApplicantList/:jobId', component:JobApplicationListComponent},
  {path:'employer', component:EmployerComponent},
  {path:'viewalljob', component:ViewalljobComponent},
  {path:'userprofile', component:UserProfileComponent},
  {path:'useredit',component:UserEditComponent},
   {path:'uploadfile', component: UploadFileComponent},
   {path:'showcv', component: ShowcvComponent},
   {path:'**', redirectTo:"/homecomp" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




// ng serve --port 57162