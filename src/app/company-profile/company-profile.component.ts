import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2';
import { ProfileService } from '../services/profile.service';
import { DataService } from '../services/dataservice.service';
import { tags } from '../services/tags.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedImage: File | null = null;
  selectedImageURL: string | null = null;
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  modalType: number = 0;
  updated_info: any = {};
  @Input() company: any;
  @Input() DirectSite: any;
  @Input() companyGuest: boolean = false;
  isArabic: boolean = false;
  applicants: any[] = []
  constructor(private router: Router, private profileservice: ProfileService,
    private translate: TranslateService, private route: ActivatedRoute,
    private renderer2: Renderer2, private dataservice: DataService) {
  }
  ngOnInit(): void {
    if (this.DirectSite == 'rtl')
      this.isArabic = true;
    this.company.tags = tags
    if (this.companyGuest) {
      let company_id = this.route.snapshot.params['id'];
      this.dataservice.getGuestCompanyJobs(company_id).subscribe(res => {
        this.company.jobs = res.jobs
        this.formatArray(this.company.jobs);
      })

      return;
    }
    this.dataservice.getCompanyJobs().subscribe(res => {
      this.company.jobs = res.jobs
    })

  }
  goToJobPageGuest(job: any) {
    this.router.navigateByUrl(`/job/${job._id}`)
  }
  formatArray(jobs: any[]) {
    jobs.map(element => {
      if (this.isApplied(element.applicants, localStorage.getItem("_id")!))
        element.isApplied = false
      else element.isApplied = true
      if (this.isNew(element.createdAt))
        element.isNew = true
      else element.isNew = false
      return element
    })
  }
  isNew(date: string): boolean {
    const date1 = new Date(date);
    const datenow = new Date();
    const diffInTime = date1.getTime() - datenow.getTime();
    const Difference_In_Days =
      Math.round
        (diffInTime / (1000 * 3600 * 24));
    return Math.abs(Difference_In_Days) <= 3
  }
  isApplied(arr: any[], value: string): boolean {
    return arr.findIndex(x => x.userId === value) == -1
  }
  LogOut() {
    localStorage.clear();
    localStorage.setItem("LANGUAGE", "en");
    this.router.navigateByUrl("/home")
  }
  goToJobPage(job: any): void {
    this.router.navigateByUrl(`/job/${job._id}?type=owner`)
  }
  NavigatetoApplicantProfile(arg0: any) {
    this.router.navigateByUrl(`/user/${arg0}`)
  }

  previousImageUrl(): string {
    return this.company.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHn1r3zJBjSAQ2MmO1NTiI4ONI5tOlzST16UwitknQQ&s"
  }
  UpdateBasic() {
    this.updated_info.name = this.company.name
    this.updated_info.location = this.company.location
    this.updated_info.email = this.company.email
    this.modalType = 1;
    this.modalDialog.show();
  }
  addNewjob() {
    this.modalType = 2;
    this.modalDialog.show();

  }
  getNamebyLang() {
    if (this.isArabic)
      return `name_ar`;
    return `name_en`
  }
  getCompanyByLang(type: any) {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      return type.name_ar
    return type.name_en
  }
  overlayClick() {
    this.modalDialog.hide()
  }
  selectImage(): void {
    this.renderer2.selectRootElement(this.fileInput.nativeElement).click();
  }
  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
      this.selectedImageURL = URL.createObjectURL(this.selectedImage);
    }
  }
  Update_Img() {
    const formData = new FormData();
    formData.append('image', this.selectedImage!);
    this.profileservice.uploadImage(formData).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Congrats',
        text: this.translate.instant("update_img_msg"),
      }).then(() => { this.selectedImageURL = null; this.company.image = res.userInfo.image; this.modalDialog.hide(); this.ngOnInit() })


    });
  }

  submitUpdateBio(form: NgForm) {

    this.profileservice.UpdateBasicInfo(form.value).subscribe((res) => {

      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("update_info_msg")
      }).then(() => { this.modalDialog.hide(); this.ngOnInit(); this.company = res.company });
    });

  }
  submitAddJob(form: NgForm) {
    this.dataservice.AddJob(form.value).subscribe((res) => {
      Swal.fire({
        icon: "success",
        title: this.translate.instant("thnx"),
        text: this.translate.instant("add_job_info_msg")
      }).then(() => { this.ngOnInit(); });
    });
  }
  showApplicants(job: any) {
    if (job.applicants.length > 0) {
      this.modalType = 3;
      this.dataservice.getApplicantsInfo(job._id).subscribe((res) => {
        this.applicants = res.applicants
        this.modalDialog.show()
      })
    }
  }
  GoToApplicantFile(url: string) {
    window.open(url, "_blank");
  }
}