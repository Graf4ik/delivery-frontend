import type { OnInit } from '@angular/core';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MealTypes } from '@app/shared/interfaces/filter.interface';
import type { IMeal } from '@app/shared/interfaces/meal.interface';
import { MealService } from '@app/shared/services/meal.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public meals: IMeal[] = [];
  public filteredMeals: IMeal[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.getMeals();
  }

  public getMeals(): void {
    this.mealService
      .getAllMeals()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((meals: IMeal[]) => {
        this.meals = meals;
        this.filteredMeals = meals;
        this.onFilter(MealTypes.BURGERS);
      });
  }

  public onFilter(type: string): void {
    type === MealTypes.All
      ? (this.filteredMeals = this.meals)
      : (this.filteredMeals = this.meals.filter((meal: IMeal) => meal.category === type));
  }

  public onSearch(searchText: string): void {
    this.filteredMeals = this.meals.filter((meal: IMeal) =>
      meal.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
}
