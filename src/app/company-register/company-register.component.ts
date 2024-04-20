import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { AuthserviceService } from '../services/authservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  DirectSite: string = "ltr";
  errorResponse: string = '';
  isArabic: boolean = false;
  specs: any[] = []
  constructor(private dataService: DataService, private router: Router, private authService: AuthserviceService) { }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.DirectSite = "rtl";
      this.isArabic = true
    }
    this.dataService.getSpecializations().subscribe(res => {
      if (res != null)
        this.specs = res.specializations
    })
  }
  onSubmit(form: any) {
    this.authService.RegisterCompany(form.value).subscribe(res => {
      Swal.fire({
        icon: "success",
        text: `welcome ${form.value.name} to start your journey with Shaglni`
      }).then(() => {
        this.router.navigateByUrl('/profile');
        localStorage.setItem("Token", res.accessToken);
        localStorage.setItem("isCompany", "1");
      });

    },
      err => {
        this.errorResponse = err.error.message
      }
    )
  }
  LoginCompanyPage() {
    this.router.navigateByUrl('/login?type=company')
  }

}
