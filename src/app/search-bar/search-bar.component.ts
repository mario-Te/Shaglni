import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  query: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  search(): void {
    this.searchEvent.emit(this.query);
  }
}
