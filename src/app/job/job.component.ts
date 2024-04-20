import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { ActivatedRoute } from '@angular/router'
import { NgxUiLoaderComponent, NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { NgForm } from '@angular/forms';
import { tags } from '../services/tags.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedImage: File | null = null;
  selectedImageURL: string | null = null;

  id = this.route.snapshot.paramMap.get('id') || "";
  job: any;
  @ViewChild('modalDialog') modalDialog!: DialogComponent;
  target: string = '#modalTarget';
  width: string = '50%';
  modalType: number = 0;
  job_deadline: string = ''
  isJobOwner: boolean = false;
  tags: any[] = []
  selectedFile: File | null = null;
  DirectSite: string = 'ltr';
  isCompany: boolean = localStorage.getItem('isCompany') === '1'
  constructor(private dataService: DataService,
    private renderer2: Renderer2,
    private route: ActivatedRoute,
    private http: HttpClient,
    private translate: TranslateService,
    private ngxService: NgxUiLoaderService
  ) {
    if (this.route.snapshot.queryParams['type'] === 'owner') {
      this.isJobOwner = true
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      this.DirectSite = "rtl";
    this.tags = tags;
    this.ngxService.start();
    this.dataService.getSignleJob(this.id).subscribe(res => {
      this.job = res.job;
      this.job_deadline = new Date(res.job.deadline).toISOString().slice(0, 10)
      if (this.isApplied(this.job.applicants, localStorage.getItem("_id")!))
        this.job.isApplied = false
      else this.job.isApplied = true
    })
    this.ngxService.stop();
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.uploadFile();
    } else {
      this.selectedFile = null;
    }
  }
  submitUpdateJob(form: NgForm) {
    console.log(form.value)
  }
  getNamebyLang() {
    if (this.DirectSite === 'rtl')
      return `name_ar`;
    return `name_en`
  }
  overlayClick() {
    this.modalDialog.hide()
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
    this.dataService.uploadJobImage(formData, this.id).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Congrats',
        text: this.translate.instant("update_img_msg"),
      }).then(() => {
        this.selectedImageURL = null;
        this.job.image = res.job.image
      })
    });
  }
  previousImageUrl() {
    return this.job.image

  }
  selectImage(): void {
    this.renderer2.selectRootElement(this.fileInput.nativeElement).click();
  }
  isApplied(arr: any[], value: string): boolean {

    return arr.findIndex(x => x.userId === value) == -1
  }
  editInfo() {

    this.modalType = 1;
    this.modalDialog.show();
  }
  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.dataService.applyForJob(formData, this.id).subscribe(
      (response) => {
        Swal.fire({
          icon: "success",
          title: this.translate.instant("thnx"),
          text: this.translate.instant("thnx_apply")
        }).then(() => this.ngOnInit());
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
