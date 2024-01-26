import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeal } from 'app/shared/interfaces/meal.interface';
import { map, Observable } from 'rxjs';

import { MealService } from './meal.service';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  private favouritesId: string[] = [];
  public isFavorites: boolean = false;

  constructor(
    private http: HttpClient,
    private mealService: MealService
  ) {}

  setFavourite(id: string | null): string {
    const indexOfMealId = this.favouritesId.indexOf(id!);
    if (indexOfMealId !== -1) {
      this.favouritesId.splice(indexOfMealId, 1);
      if (this.isFavorites === !!this.favouritesId.length) {
        this.clearFavorites();
        this.getFavorites();
      }
      return `Блюдо с ID: ${id} убрано из избранных`;
    }
    this.favouritesId.push(id!);
    return `Блюдо с ID: ${id} добавлено в избранные`;
  }

  isFavorite(id: string): boolean {
    return !!this.favouritesId.find((val: string) => val === id);
  }

  getFavorites(): Observable<IMeal[]> {
    return this.mealService.getAllMeals()
      .pipe(map((meals: IMeal[]) => meals.filter((meal: any) => this.favouritesId.includes(meal.id))));
  }

  clearFavorites(): void {
    this.favouritesId = [];
  }
}
