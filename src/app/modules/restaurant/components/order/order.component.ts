import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../../models/food-item.model';
import { FoodItemService } from '../../services/food-item.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public foodItems: FoodItem[];
  public orderItems: number[] = [];
  public alert: 'success' | 'error';

  constructor(
    private foodItemService: FoodItemService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.foodItemService.getAll().subscribe((res) => (this.foodItems = res));
  }

  public updateOrder(itemId: number, checked: boolean): void {
    if (this.orderItems.includes(itemId) && !checked) {
      const index = this.orderItems.findIndex((f) => f === itemId);
      this.orderItems.splice(index, 1);
    } else if (!this.orderItems.includes(itemId) && checked) {
      this.orderItems.push(itemId);
    }
  }

  public order(): void {
    const items = this.orderItems.map((d) => {
      const item: FoodItem = { id: d };
      return item;
    });
    const order: Order = {
      orderDateTime: new Date(),
      items,
      user: { id: 1 }, // TODO: Set authenticated user
    };
    this.orderService.save(order).subscribe(
      () => {
        this.alert = 'success';
        this.orderItems.length = 0;
        setTimeout(() => (this.alert = undefined), 3000);
      },
      (error) => {
        console.error(error);
        this.alert = 'error';
      }
    );
  }
}
