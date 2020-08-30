import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  static URL = 'api/orders';

  constructor(private http: HttpClient) {}

  public save(order: Order): Observable<any> {
    const api = `${environment.server}/${OrderService.URL}`;

    return this.http.post(api, order);
  }

  public getAll(): Observable<any> {
    const api = `${environment.server}/${OrderService.URL}/all`;

    return this.http.get(api);
  }

  public getAllUnpaid(): Observable<any> {
    const api = `${environment.server}/${OrderService.URL}/unpaid`;

    return this.http.get(api);
  }

  public getOrdersBetween(obj: { start: Date; end: Date }): Observable<any> {
    const api = `${environment.server}/${OrderService.URL}/orderDateTime/between`;

    return this.http.post(api, obj);
  }
}
