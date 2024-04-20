import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { spec } from '../services/skills.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderComponent } from 'ngx-ui-loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedImage: File | null = null;
  selectedImageURL: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  user: any = false;
  company: any = false;
  @Input() isGuest: boolean = false;
  @Input() isCompanyGuest: boolean = false;
  userSkills: any[] = [];
  newSkills: any[] = [];
  modalType: number = 0;
  DirectSite: string = "ltr";
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  isArabic: boolean = false;
  loading: boolean = true;
  user_birthdate: string = ""
  specs: any[] = []
  constructor(private profileservice: ProfileService,
    private translate: TranslateService,
    private router: Router,
    private renderer2: Renderer2,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.DirectSite = "rtl";
      this.isArabic = true
    }
    this.specs = spec;
    if (this.isGuest) {
      let user_id = this.route.snapshot.params['id'];
      this.profileservice.getUserData(user_id).subscribe((res) => {
        if (res.userInfo) {
          this.user = res.userInfo
          if (res.userInfo.skills) {
            let obj = res.userInfo.skills;
            this.userSkills = Object.keys(obj).map((key) => [key, obj[key]]);
          }
          this.user_birthdate = new Date(this.user.user.birthdate).toJSON().slice(0, 10)
          this.loading = false;
        }
      });
      return;
    }
    if (this.isCompanyGuest) {
      let company_id = this.route.snapshot.params['id'];
      this.profileservice.getCompanyData(company_id).subscribe((res) => {
        if (res.companyInfo) {
          this.company = res.companyInfo
          this.user = false;
          this.loading = false;
        }

      });
    }
    this.profileservice.getData().subscribe((res) => {
      if (res.userInfo) {
        this.user = res.userInfo
        if (res.userInfo.skills) {
          let obj = res.userInfo.skills;
          this.userSkills = Object.keys(obj).map((key) => [key, obj[key]]);
        }
        this.user_birthdate = new Date(this.user.user.birthdate).toJSON().slice(0, 10)
        this.loading = false;
      }
      if (res.companyInfo) {
        this.company = res.companyInfo
        this.user = false;
        this.loading = false;
      }
    })

  }
  getWidth(arg: number) {
    return arg + "%";
  }
  newSkill() {
    this.newSkills.push(["", 50]);
  }
  removepreviousSkill(i: number) {
    this.userSkills.splice(i, 1)
  }
  removenewSkill(i: number) {
    this.newSkills.splice(i, 1)
  }
  overlayClick() {
    this.modalDialog.hide()
  }
  UpdateBasic() {
    this.modalType = 4;
    this.modalDialog!.show()
  }
  UpdateBio() {
    this.modalType = 1;
    this.modalDialog!.show()
  }
  UpdateSkills() {
    this.modalType = 2;
    this.modalDialog!.show()
  }
  LogOut() {
    localStorage.clear();
    localStorage.setItem("LANGUAGE", "en");
    this.router.navigateByUrl("/home")
  }
  UpdateEducation() {
    this.modalType = 3;
    this.modalDialog!.show()
  }
  submitUpdateBio(form: NgForm) {
    this.profileservice.Updatebio(form.value).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("update_info_msg")
      }).then(() => this.ngOnInit());
    })
  }
  submitUpdateEducation(form: NgForm) {
    this.profileservice.UpdateEducation(form.value).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("update_info_msg")
      }).then(() => this.ngOnInit());
    })
  }
  submitUpdateSkills() {
    let formSkills: any[] = []
    this.userSkills.forEach(skill => {
      formSkills.push(skill)
    });
    this.newSkills.forEach(skill => {
      formSkills.push(skill)
    });
    this.profileservice.UpdateSkills(formSkills).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("update_info_msg")
      }).then(() => this.ngOnInit());
    })
  }
  submitUpdateBasicInfo(form: NgForm) {

    this.profileservice.UpdateBasicInfo(form.value).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("update_info_msg")
      }).then(() => this.ngOnInit());
    })
  }
  getspecByLang(item: any) {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      return item.arabic;
    return item.english
  }
  previousImageUrl(): string {
    return this.user.image || "https://bootdey.com/img/Content/avatar/avatar7.png"
  }
  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
      this.selectedImageURL = URL.createObjectURL(this.selectedImage);
    }
  }
  selectImage(): void {
    this.renderer2.selectRootElement(this.fileInput.nativeElement).click();
  }
  Update_Img() {
    const formData = new FormData();
    formData.append('image', this.selectedImage!);
    this.profileservice.uploadImage(formData).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Congrats',
        text: this.translate.instant("update_img_msg"),
      }).then(() => this.selectedImageURL = null, this.user.image = res.userInfo.image);

    });
  }

}
