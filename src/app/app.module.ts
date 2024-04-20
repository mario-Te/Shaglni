import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JobsComponent } from './jobs/jobs.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { JobComponent } from './job/job.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { UserComponenetComponent } from './user-componenet/user-componenet.component';
import { CompanyComponent } from './company/company.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    JobsComponent,
    SearchBarComponent,
    ProfileComponent,
    JobComponent,

    CompanyRegisterComponent,
    CompanyProfileComponent,
    UserComponenetComponent,
    CompanyComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgSelectModule,
    AppRoutingModule,
    DialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}