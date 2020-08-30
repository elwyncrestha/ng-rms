import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantGuard implements CanLoad {
  constructor(private router: Router, private appService: AppService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.appService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
