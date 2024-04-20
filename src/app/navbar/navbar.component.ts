import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isExpanded: boolean = false;
  isCollapsed: boolean = false;
  isNotificationExpanded: boolean = false;
  isArabic: boolean = false;
  count: number = 0;
  DirectSite: string = "ltr";
  notifications: any[] = []
  constructor(private route: Router, private notificationService: NotificationService) { }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.DirectSite = "rtl";
      this.isArabic = true;
    }
    if (!this.isGuest())
      this.notificationService.getNotification().subscribe((res) => {
        this.notifications = res.notifications
        this.count = this.notifications.filter(notification => notification.seen == false).length;
      })
  }
  goToNotifications() {
    this.isNotificationExpanded = !this.isNotificationExpanded;
    if (this.count > 0 && this.isNotificationExpanded) {
      this.notificationService.openNotifications().subscribe(
        res => {
          this.count = 0
        }
      )
    }
  }
  isGuest(): boolean {
    return localStorage.getItem("Token") == null;
  }
  goToJobs(): void {
    this.route.navigateByUrl('/jobs')
  }
  goToHome(): void {
    this.route.navigateByUrl('/home')
  }
  changeDropDownStatus(): void {
    this.isExpanded = !this.isExpanded
  }
  changeCollapseStatus(): void {
    this.isCollapsed = !this.isCollapsed
  }
  goToRegister(): void {
    this.route.navigateByUrl('/register')
  }
  gotoProfile(): void {
    this.route.navigateByUrl('/profile')
  }
  setLang(lang: string): void {
    localStorage.setItem("LANGUAGE", lang);
    window.location.reload()
  }
}
