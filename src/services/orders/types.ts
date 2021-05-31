export interface OrderItem {
  count: number;
  price: number;
  sum: number;
}

export type OrderItems = Map<string, OrderItem>;
