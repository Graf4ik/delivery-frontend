import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/shared/contstants/constants';
import { Login, LoginResponse, Registration } from 'app/shared/interfaces/auth.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<any> {
    return this.http.post(`${API_URL}/auth/login/`, data).pipe(
      tap(({ accessToken, refreshToken }: Partial<LoginResponse>) => {
        if (typeof accessToken === 'string') {
          localStorage.setItem('accessToken', accessToken);
          if (typeof refreshToken === 'string') {
            localStorage.setItem('refreshToken', refreshToken);
          }
        }
      }),
    );
  }

  register(data: Registration): Observable<LoginResponse | unknown> {
    return this.http.post(`${API_URL}/auth/register/`, data);
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken') || '{}';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): Observable<number | unknown> {
    return this.http.post(`${API_URL}/auth/logout/`, {});
  }
}
