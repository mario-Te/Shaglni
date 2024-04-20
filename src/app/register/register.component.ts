import { Component, OnInit } from '@angular/core';
import { AuthserviceService as AuthService } from '../services/authservice.service';
import { DataService } from '../services/dataservice.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  specs: any[] = []
  DirectSite: string = "ltr";
  errorResponse: string = ''
  isArabic: boolean = false;
  constructor(private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private translateService: TranslateService
  ) { }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.DirectSite = "rtl";
      this.isArabic = true
    }
    this.dataService.getSpecializations().subscribe(res => {
      this.specs = res.specializations
    })
  }
  LoginPage() {
    this.router.navigateByUrl('/login')
  }
  onSubmit(form: any) {
    this.authService.Register(form.value).subscribe(res => {
      Swal.fire({
        icon: "success",
        text: `welcome ${form.value.username} to start your journey with Shaglni`
      }).then(() => {
        localStorage.setItem("Token", res.accessToken)
        localStorage.setItem("_id", res.user._id);
        this.router.navigateByUrl('/home')
      });

    }, error => {
      // Handle Register error
      this.errorResponse = error.error.message
    })

  }
  LoginCompanyPage() {

  }
}
