import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EMPTY, of, tap} from "rxjs";

interface IJson {
  completed: false;
  userId: number;
  title: string;
  id: number
}

@Injectable()
export class JsonPlaceholderResolver implements Resolve<IJson> {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): any {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/').pipe(
      tap(
        (res) => of(res),
        (err) => {
          this.router.navigate(['/']);
          return EMPTY;
        }
      )
    )
  }
}
