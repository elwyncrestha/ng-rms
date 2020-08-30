import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DateRangeDto } from '../models/date-range.dto';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  static URL = 'api/charts';

  constructor(private http: HttpClient) {}

  public getSummary(obj: DateRangeDto[]): Observable<any> {
    const api = `${environment.server}/${ChartService.URL}/summary`;

    return this.http.post(api, obj);
  }
}
