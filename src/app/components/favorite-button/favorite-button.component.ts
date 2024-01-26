import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent {
  @Output() clickFavorite: EventEmitter<any> = new EventEmitter();
  @Input() isClicked: boolean = false;

  clickHandler(): void {
    this.isClicked = !this.isClicked;
    this.clickFavorite.emit(this.isClicked);
  }
}
