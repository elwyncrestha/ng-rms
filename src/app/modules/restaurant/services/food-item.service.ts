import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodItemService {
  static URL = 'food-items';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    const api = `${environment.server}/${FoodItemService.URL}/all`;

    return this.http.get(api);
  }
}
