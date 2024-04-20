import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) { }
  navigateHome() {
    this.router.navigateByUrl('/home')
  }
  Services
    () {
    this.router.navigateByUrl('/home#services')
  }
}
