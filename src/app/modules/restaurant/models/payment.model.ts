import { Order } from './order.model';

export class Payment {
  id?: number;
  order?: Order;
  paymentDateTime?: Date;
  paidAmount?: number;
  returnedAmount?: number;
}
