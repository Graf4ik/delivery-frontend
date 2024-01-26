import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMeal } from '@app/shared/interfaces/meal.interface';
import { FavoritesService } from '@app/shared/services/favorites.service';

import { ProductItemDetailsComponent } from '../product-item-details/product-item-details.component';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() meal!: IMeal;

  constructor(
    private favoritesService: FavoritesService,
    private dialog: MatDialog,
  ) {}

  setFavourite(id: string) {
    this.favoritesService.setFavourite(id);
  }

  checkFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  openModalDetails(): void {
    const dialogRef = this.dialog.open(ProductItemDetailsComponent, {
      hasBackdrop: true,
      height: '500px',
      width: '700px',
      data: {
        meal: this.meal,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
