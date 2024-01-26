import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from '@app/shared/interfaces/cart.interface';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: ICartItem;
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) {}

  openMealPage(): void {
    this.router.navigate([`/${this.cartItem.mealId}`]);
  }

  deleteCartItem(id: string): void {
    this.deleteRecord.emit(id);
  }
}
