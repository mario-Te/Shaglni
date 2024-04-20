import { Component, OnInit } from '@angular/core';
import { AuthserviceService as AuthService } from '../services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorResponse: string = '';
  IsCompanyLogin: boolean = false
  DirectSite: string = 'ltr';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    if (this.route.snapshot.queryParams['type'] === 'company') {
      this.IsCompanyLogin = true
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      this.DirectSite = "rtl";
  }
  RegisterPage() {
    if (!this.IsCompanyLogin)
      this.router.navigateByUrl("/register")
    if (this.IsCompanyLogin)
      this.router.navigateByUrl("/company-register")
  }
  onSubmit(form: any) {
    if (this.IsCompanyLogin) {
      this.authService.loginCompany(form.value).subscribe(
        response => {
          Swal.fire({
            icon: "success",
            text: `welcome ${response.company.name} to start your journey with Shaglni`
          }).then(() => {
            localStorage.setItem("Token", response.accessToken);
            localStorage.setItem("isCompany", "1");
            this.router.navigateByUrl('/home')
          });

        },
        error => {
          // Handle login error

          this.errorResponse = error.error.message
        }
      );
      return;
    }
    this.authService.login(form.value).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          text: `welcome ${response.user.username} to start your journey with Shaglni`
        }).then(() => {
          localStorage.setItem("Token", response.accessToken);
          localStorage.setItem("_id", response.user._id);
          this.router.navigateByUrl('/home')
        });

      },
      error => {
        // Handle login error

        this.errorResponse = error.error.message
      }
    );

  }
}
