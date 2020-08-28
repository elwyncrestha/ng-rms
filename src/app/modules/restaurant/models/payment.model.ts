import { Order } from './order.model';

export class Payment {
  id?: number;
  order?: Order;
  paidAmount?: number;
  returnedAmount?: number;
}
