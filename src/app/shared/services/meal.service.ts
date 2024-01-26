import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeal } from 'app/shared/interfaces/meal.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MealService {
  constructor(private http: HttpClient) {}

  getAllMeals(): Observable<IMeal[]> {
    const url: string = 'assets/data/db.json';
    return this.http.get<IMeal[]>(url);
  }

  getOne(id: string | null): Observable<IMeal[]> {
    return this.getAllMeals().pipe(map((meal) => meal.filter((el) => el.id === id)));
  }
}
