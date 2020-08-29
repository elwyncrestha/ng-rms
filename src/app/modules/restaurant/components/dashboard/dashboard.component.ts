import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { DateRange } from '../../../../models/date-range.enum';
import { DateUtils } from '../../../../utils/date.utils';
import { ChartService } from '../../services/chart.service';
import { DateRangeDto } from '../../models/date-range.dto';
import { OrderPaymentCountDto } from '../../models/order-payment-count.dto';

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
  public chartData: {
    today?: { HEADS: 'Orders' | 'Payments'; COUNT: number }[];
    last7?: { HEADS: 'Orders' | 'Payments'; COUNT: number }[];
    month?: { HEADS: 'Orders' | 'Payments'; COUNT: number }[];
    year?: { HEADS: 'Orders' | 'Payments'; COUNT: number }[];
  };

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.fetchSummaryChart();
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

  private fetchSummaryChart(): void {
    const obj: DateRangeDto[] = [];
    Object.values(DateRange).forEach((range) =>
      obj.push({
        reference: range,
        start: DateUtils.getDateRange(range).start,
        end: DateUtils.getDateRange(range).end,
      })
    );
    this.chartService
      .getSummary(obj)
      .subscribe((response: OrderPaymentCountDto[]) => {
        this.chartData = {};

        this.chartData = {
          today: this.getOrderPaymentArray(response, DateRange.TODAY),
          last7: this.getOrderPaymentArray(response, DateRange.WEEK),
          month: this.getOrderPaymentArray(response, DateRange.MONTH),
          year: this.getOrderPaymentArray(response, DateRange.YEAR),
        };

        if (
          !this.chartData.today &&
          !this.chartData.last7 &&
          !this.chartData.month &&
          !this.chartData.year
        ) {
          this.chartData = undefined;
        }
      });
  }

  private getOrderPaymentArray(
    res: OrderPaymentCountDto[],
    range: DateRange
  ): any[] | null {
    const orders = res.find((r) => r.reference === range).orders;
    const payments = res.find((r) => r.reference === range).payments;

    if (orders === 0 && payments === 0) {
      return null;
    }

    return [
      {
        HEADS: 'Orders',
        COUNT: orders,
      },
      {
        HEADS: 'Payments',
        COUNT: payments,
      },
    ];
  }
}
