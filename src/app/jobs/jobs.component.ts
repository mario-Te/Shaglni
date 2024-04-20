import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../services/dataservice.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  DirectSite: string = "ltr";
  isLoading: boolean = true;
  jobs: any = [];
  constructor(private dataSerice: DataService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }
  isCompany: boolean = localStorage.getItem('isCompany') === '1'
  @Input() current_job_page: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  getPages(): number[] {
    const startPage = Math.max(1, this.current_job_page - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      this.DirectSite = "rtl";
    this.ngxService.start();
    this.dataSerice.getJobs(this.current_job_page).subscribe((res: any) => {
      if (res != null) {
        this.jobs = res.jobs
        this.totalPages = res.count;
        this.isLoading = false;
        this.formatArray(this.jobs);
      }

    })
  }

  goToPage(page: number): void {
    if (page !== this.current_job_page) {
      this.pageChange.emit(page);
      this.ngxService.start();
      this.current_job_page = page;
      this.dataSerice.getJobs(page).subscribe((res: any) => {
        this.jobs = res.jobs
        this.totalPages = res.count;
        this.formatArray(this.jobs);
      })
      this.ngxService.stop();
    }
  }
  goToJobPage(job: any): void {
    this.router.navigateByUrl(`/job/${job._id}`)
  }

  performSearch(query: string): void {
    if (query != "") {
      this.dataSerice.searchJobs(query, this.current_job_page).subscribe((res: { jobs: any; count: number; }) => {
        this.jobs = res.jobs
        this.totalPages = res.count;
      })
    }
    else {
      this.dataSerice.getJobs(this.current_job_page).subscribe(res => {
        this.jobs = res.jobs
        this.totalPages = res.count;
        this.isLoading = false;
        this.formatArray(this.jobs);
      })
    }
  }
  NavigatetoCompanyProfile(arg0: any) {
    this.router.navigateByUrl('/company/' + arg0)
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
  isApplied(arr: any[], value: string): boolean {
    return arr.findIndex(x => x.userId === value) == -1
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
}
