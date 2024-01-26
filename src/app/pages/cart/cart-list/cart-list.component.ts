import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICartItem } from '@app/shared/interfaces/cart.interface';
import { CartService } from '@app/shared/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  cartItems: ICartItem[] = [];
  loading: boolean = false;
  total: number = 0;
  totalItem: number = 0;
  tax: number = this.cartService.tax;
  deliveryCharge: number = this.cartService.deliveryCharge;
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getCartItems(): void {
    this.cartService.sub$.pipe(takeUntil(this.destroy$)).subscribe((items: ICartItem[]) => {
      this.cartItems = items;
      this.getTotalItem(items);
    });
  }

  deleteCartItem(id: any): void {
    this.cartService.deleteCartItem(id);
  }

  private getTotalItem(items: ICartItem[]): void {
    let total: number = 0;
    // eslint-disable-next-line no-return-assign
    items.forEach((item) => (total += item.mealPrice));
    this.totalItem = total;
    this.total = total + this.tax + this.deliveryCharge;
    total = 0;
  }

  toPay(): void {
    this.loading = true;
    const payment = new Promise(() => {
      setTimeout(() => {
        this.loading = false;
        this.cartService.createOrder();
        const dialogRef = this.dialog.open(CartModalComponent, {
          width: '400px',
          height: '250px',
        });

        dialogRef.afterClosed().subscribe(() => {});
      }, 2000);
    });
  }
}
