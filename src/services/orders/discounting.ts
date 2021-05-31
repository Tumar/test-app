import { DiscountType } from 'src/models/DiscountRule';

import { OrderItem } from './types';

interface DiscountRule {
  productCode: string;
  type: DiscountType;
  quantity: number;
  discount: number;
}

type ApplyDiscountFunc = (
  orderItem: OrderItem,
  discountRule: DiscountRule,
) => OrderItem;

const applyBogosDiscount: ApplyDiscountFunc = (orderItem) => {
  const remainder = orderItem.count % 2;
  const count = orderItem.count - remainder;

  return {
    ...orderItem,
    sum: count * orderItem.price * 0.5 + remainder * orderItem.price,
  };
};

const applyBulkDiscount: ApplyDiscountFunc = (orderItem, discountRule) => {
  if (orderItem.count < discountRule.quantity) {
    return orderItem;
  }

  return {
    ...orderItem,
    sum:
      orderItem.count * orderItem.price * ((100 - discountRule.discount) / 100),
  };
};

export const registeredDiscountFuncs = new Map([
  [DiscountType.BOGOF, applyBogosDiscount],
  [DiscountType.BULK, applyBulkDiscount],
]);
