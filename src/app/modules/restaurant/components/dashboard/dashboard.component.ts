import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { DateRange } from '../../../../models/date-range.enum';
import { DateUtils } from '../../../../utils/date.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public todayOrders: Order[];
  public orderRangeType: DateRange = DateRange.TODAY;
  public todayPayments: Payment[];
  public paymentRangeType: DateRange = DateRange.TODAY;
  public DateRangeValues = Object.values(DateRange);

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchPayments();
  }

  public fetchOrders(): void {
    this.orderService
      .getOrdersBetween(DateUtils.getDateRange(this.orderRangeType))
      .subscribe((response) => (this.todayOrders = response));
  }

  public fetchPayments(): void {
    this.paymentService
      .getPaymentsBetween(DateUtils.getDateRange(this.paymentRangeType))
      .subscribe((response) => (this.todayPayments = response));
  }
}
