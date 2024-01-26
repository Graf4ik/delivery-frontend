import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICartItem } from '@app/shared/interfaces/cart.interface';
import { IMeal } from '@app/shared/interfaces/meal.interface';
import { CartService } from '@app/shared/services/cart.service';
import { FavoritesService } from '@app/shared/services/favorites.service';
import { MealService } from '@app/shared/services/meal.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { UUID } from 'angular2-uuid';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss'],
})
export class ProductItemDetailsComponent implements OnInit, OnDestroy {
  public meal: IMeal = this.data.meal;
  public cartItemId!: string;
  public isInCart!: boolean;
  public id!: string | null;
  public count: number = 1;

  private destroy$: Subject<boolean> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ProductItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private mealService: MealService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log('data: ', this.data);
    console.log('meal: ', this.meal);
    this.checkInCart();
    console.log('id onInit: ', this.getId());
  }

  private getId(): string {
    return (this.id = this.route.snapshot.paramMap.get('id')!);
  }

  addToCard() {
    this.cartItemId = UUID.UUID();
    const cartItem: ICartItem = {
      id: this.cartItemId,
      mealId: this.meal.id,
      mealPrice: Number(this.meal.price * this.count),
      pictureUrl: this.meal.pictureUrl,
      title: this.meal.title,
      count: this.count,
    };
    this.cartService.addToCart(cartItem);
    this.cartService.changeCount(cartItem.id!, this.count, Number(this.meal.price));
    this.notificationService.success('Item added to cart');
    this.goToCart();
  }

  setFavourite(id: string): void {
    this.favoritesService.setFavourite(id);
  }

  checkFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  protected goToCart(): void {
    this.close();
    this.router.navigate(['/cart']);
  }

  onIncrement(): void {
    this.count++;
  }

  onDecrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private checkInCart(): void {
    this.cartService.sub$.pipe(takeUntil(this.destroy$)).subscribe((items: ICartItem[]) => {
      const cartItem = items.find((item) => item.mealId === this.id);
      this.isInCart = !!cartItem;
      cartItem ? (this.count = cartItem.count) : null;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
