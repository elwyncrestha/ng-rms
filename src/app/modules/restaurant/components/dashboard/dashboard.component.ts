import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public todayOrders: Order[];
  public todayPayments: Payment[];

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchPayments();
  }

  private fetchOrders(): void {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    this.orderService
      .getOrdersBetween(start, end)
      .subscribe((response) => (this.todayOrders = response));
  }

  private fetchPayments(): void {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    this.paymentService
      .getPaymentsBetween(start, end)
      .subscribe((response) => (this.todayPayments = response));
  }
}
