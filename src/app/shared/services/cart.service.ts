import { Injectable } from '@angular/core';
import { ICartItem } from 'app/shared/interfaces/cart.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  public cartItems: ICartItem[] = [];
  public tax: number = 0.25;
  public deliveryCharge: number = 2.5;
  public sub$ = new BehaviorSubject<ICartItem[]>([]);
  public isInCartSub$ = new BehaviorSubject<boolean>(false);

  addToCart(cartItem: ICartItem): void {
    const isInCart = !!this.cartItems.find(
      (item) => item.mealId === cartItem.mealId
    );
    if (!isInCart) {
      this.cartItems.push(cartItem);
      this.sub$.next(this.cartItems);
    } else {
    }
  }

  changeCount(mealId: string, count: number, mealPrice: number): void {
    this.cartItems[0].count = count;
    this.cartItems[0].mealPrice = count * mealPrice;
    this.sub$.next(this.cartItems);
  }

  deleteCartItem(cartItemId: string) {
    this.cartItems = this.cartItems.filter(
      (item) => item.mealId !== cartItemId
    );
    this.sub$.next(this.cartItems);
  }

  private deleteAllCartItems(): void {
    this.cartItems = [];
    this.sub$.next(this.cartItems);
  }

  createOrder(): void {
    this.deleteAllCartItems();
  }

  // CheckInCart(cartItemId: string): BehaviorSubject<boolean> {
  //   let isInCart!: boolean;
  //   this.sub$.subscribe((items) => {
  //     isInCart = !!items.find((item) => item.id === cartItemId);
  //     this.isInCartSub$.next(isInCart);
  //   });
  //
  //   return this.isInCartSub$;
  // }
}
