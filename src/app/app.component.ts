import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shaglni';
  directSite: string = 'ltr'
  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('LANGUAGE') || "ar")
    translate.setDefaultLang(localStorage.getItem('LANGUAGE') || "ar");
    if (localStorage.getItem("LANGUAGE") === 'ar') {
      this.directSite = 'rtl'
    }
  }

}
