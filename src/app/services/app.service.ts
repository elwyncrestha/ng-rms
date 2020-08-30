import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { local } from 'd3';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  static ACCESS_TOKEN = 'access_token';

  constructor(private http: HttpClient) {}

  public getAccessToken(data: {
    username: string;
    password: string;
  }): Observable<any> {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    params.append('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa('rmsClient:rmsSecret')}`,
    });
    return this.http.post(
      `${environment.server}/oauth/token`,
      params.toString(),
      {
        headers,
      }
    );
  }

  public setToken(token: string): void {
    localStorage.setItem(AppService.ACCESS_TOKEN, token);
  }

  public getToken(): string {
    return localStorage.getItem(AppService.ACCESS_TOKEN);
  }

  public hasToken(): boolean {
    const t = localStorage.getItem(AppService.ACCESS_TOKEN);
    return t !== undefined && t != null;
  }

  public removeToken(): void {
    return localStorage.removeItem(AppService.ACCESS_TOKEN);
  }
}
