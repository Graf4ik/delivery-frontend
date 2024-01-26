import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMeal } from '@app/shared/interfaces/meal.interface';
import { FavoritesService } from '@app/shared/services/favorites.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public meals: IMeal[] = [];
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  clear(): void {
    this.favoritesService.clearFavorites();
    this.getFavorites();
  }

  toMain(): void {
    this.router.navigate(['/']);
  }

  private getFavorites(): void {
    this.favoritesService
      .getFavorites()
      .pipe(takeUntil(this.destroy$))
      .subscribe((meals: IMeal[]) => {
        this.meals = meals;
      });
  }
}
