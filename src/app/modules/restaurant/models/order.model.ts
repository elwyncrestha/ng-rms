import { User } from '../../../models/user.model';
import { FoodItem } from './food-item.model';

export class Order {
  id?: number;
  user?: User;
  orderDateTime?: Date;
  items?: FoodItem[];
}
