import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    this.appService.removeToken();
    this.router.navigate(['/login']);
  }
}
