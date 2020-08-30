import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  static URL = 'api/payments';

  constructor(private http: HttpClient) {}

  public save(payment: Payment): Observable<any> {
    const api = `${environment.server}/${PaymentService.URL}`;

    return this.http.post(api, payment);
  }

  public getPaymentsBetween(obj: { start: Date; end: Date }): Observable<any> {
    const api = `${environment.server}/${PaymentService.URL}/paymentDateTime/between`;

    return this.http.post(api, obj);
  }
}
