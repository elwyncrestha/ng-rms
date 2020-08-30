import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.appService.hasToken()) {
      return next.handle(req);
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.appService.getToken()}`,
      },
    });

    return next.handle(req);
  }
}
