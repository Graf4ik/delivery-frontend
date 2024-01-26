import { Component, EventEmitter, Output } from '@angular/core';

const enterKey = 'Enter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchSting: string = '';

  public handleSearch(event: KeyboardEvent) {
    if (event.key === enterKey) {
      this.search.emit(this.searchSting);
    }
  };
}
