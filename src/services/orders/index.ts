import { RESOLVER } from 'awilix';
import DiscountRule from 'src/models/DiscountRule';

import Product from 'src/models/Product';
import { currencyCentsToUnits } from 'src/util/currency';

import { registeredDiscountFuncs } from './discounting';
import { OrderItem, OrderItems } from './types';

interface EstimateOrderTotalResult {
  total: number;
}

export default class OrdersService {
  static [RESOLVER] = {
    name: 'ordersService',
  };

  private async applyDiscounts(orderItems: OrderItems) {
    const discountRules = await DiscountRule.query();

    discountRules.forEach((discountRule) => {
      if (!orderItems.has(discountRule.productCode)) {
        return;
      }
      const orderItem = orderItems.get(discountRule.productCode);

      if (!registeredDiscountFuncs.has(discountRule.type)) {
        return;
      }

      const applyDiscountFunc = registeredDiscountFuncs.get(discountRule.type);
      orderItems.set(
        discountRule.productCode,
        applyDiscountFunc(orderItem, discountRule),
      );
    });

    return orderItems;
  }

  async estimateOrderTotal(
    codesList: string[],
  ): Promise<EstimateOrderTotalResult> {
    if (codesList.length < 1) {
      throw new Error('Invalid codes list');
    }

    const codesOccurences = codesList.reduce<{ [code: string]: number }>(
      // eslint-disable-next-line no-param-reassign,no-return-assign
      (a, b) => (a[b] = a[b] + 1 || 1) && a,
      {},
    );
    const uniqueCodes = Object.keys(codesOccurences);
    const products = await Product.query().whereIn('code', uniqueCodes);
    if (uniqueCodes.length !== products.length) {
      throw new Error('Invalid codes list');
    }

    const orderItems = new Map<string, OrderItem>();
    products.forEach((product) => {
      orderItems.set(product.code, {
        count: codesOccurences[product.code],
        price: product.price,
        sum: product.price * codesOccurences[product.code],
      });
    });

    const discountedOrderItems = await this.applyDiscounts(orderItems);
    const totalInCents = [...discountedOrderItems].reduce(
      (prev, [_, orderItem]) => prev + orderItem.sum,
      0,
    );

    return {
      total: currencyCentsToUnits(totalInCents),
    };
  }
}
