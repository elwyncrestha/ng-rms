import { Component, OnInit } from '@angular/core';

import { PaymentService } from '../../services/payment.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public orders: Order[];
  public processOrder = false;
  public paymentForm: FormGroup;
  public alert: 'success' | 'error';

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.buildForm();
  }

  public process(order: Order): void {
    this.paymentForm.patchValue({
      order,
      totalAmount: order.items.map((i) => i.price).reduce((a, b) => a + b, 0),
    });
    this.processOrder = true;
  }

  public proceedPayment(): void {
    this.paymentService.save(this.paymentForm.value).subscribe(
      () => {
        this.alert = 'success';
        this.fetchOrders();
        this.paymentForm.reset();
        setTimeout(() => {
          this.alert = undefined;
          this.processOrder = false;
        }, 3000);
      },
      (error) => {
        console.error(error);
        this.alert = 'error';
      }
    );
  }

  private buildForm(): void {
    this.paymentForm = this.formBuilder.group({
      order: [undefined, Validators.required],
      totalAmount: [undefined],
      paidAmount: [undefined, Validators.required],
      returnedAmount: [undefined, Validators.required],
    });
    const totalAmount = this.paymentForm.get('totalAmount');
    const paidAmount = this.paymentForm.get('paidAmount');
    const returnedAmount = this.paymentForm.get('returnedAmount');
    this.paymentForm.get('paidAmount').valueChanges.subscribe(() => {
      returnedAmount.setValue(
        Number(paidAmount.value) - Number(totalAmount.value)
      );
    });
  }

  private fetchOrders(): void {
    this.orderService
      .getAllUnpaid()
      .subscribe((response) => (this.orders = response));
  }
}
