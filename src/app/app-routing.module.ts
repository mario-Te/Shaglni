import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { JobComponent } from './job/job.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { AuthGuard } from './authguard.guard';
import { GuestGuard } from './guest.guard';
import { UserComponenetComponent } from './user-componenet/user-componenet.component';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],

  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'login/:type',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'jobs',
    component: JobsComponent
  }
  ,
  {
    path: 'job/:id',
    component: JobComponent
  },
  {
    path: 'job/:id/:type',
    component: JobComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/:id',
    component: UserComponenetComponent,
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
  },
  {
    path: 'company-register',
    component: CompanyRegisterComponent, canActivate: [GuestGuard],
  }
  , { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
