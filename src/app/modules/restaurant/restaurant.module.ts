import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RestaurantComponent,
    OrderComponent,
    PaymentComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class RestaurantModule {}
