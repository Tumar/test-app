import { asValue } from 'awilix';

import DiscountRule, { DiscountType } from 'src/models/DiscountRule';
import Product from 'src/models/Product';

import { container } from 'src/util/container';
import {
  resetPostgresData,
  setUpPostgres,
  tearDownPostgres,
} from 'test/util/postgres';

import OrdersService from '..';

describe('services/orders', () => {
  beforeAll(async () => {
    await setUpPostgres();
  });

  afterEach(async () => {
    await resetPostgresData();
  });

  afterAll(async () => {
    await tearDownPostgres();
  });

  const createMockedOrdersService = (dependencies = {}) => {
    const scope = container.createScope();

    Object.entries(dependencies).forEach(([name, value]) => {
      scope.register({
        [name]: asValue(value),
      });
    });

    return scope.resolve<OrdersService>('ordersService');
  };

  const createSampleData = async () => {
    await Product.query().insert([
      {
        code: 'CC',
        name: 'Coca-Cola',
        price: 1.5 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'PC',
        name: 'Pepsi-Cola',
        price: 2.0 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'WA',
        name: 'Water',
        price: 0.85 * 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

  describe('#estimateOrderTotal', () => {
    it('estimates total for valid product codes', async () => {
      const ordersService = createMockedOrdersService();
      await createSampleData();

      const { total } = await ordersService.estimateOrderTotal([
        'CC',
        'CC',
        'PC',
        'PC',
        'PC',
        'WA',
      ]);

      expect(total).toEqual(9.85);
    });

    it('estimate total with applying bofos discount', async () => {
      const ordersService = createMockedOrdersService();
      await createSampleData();
      await DiscountRule.query().insert([
        {
          productCode: 'CC',
          type: DiscountType.BOGOF,
          quantity: 0,
          discount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const { total } = await ordersService.estimateOrderTotal([
        'CC',
        'CC',
        'PC',
        'PC',
        'PC',
        'WA',
      ]);
      expect(total).toEqual(8.35);
    });

    it('estimate total with applying bulk discount', async () => {
      const ordersService = createMockedOrdersService();
      await createSampleData();
      await DiscountRule.query().insert([
        {
          productCode: 'PC',
          type: DiscountType.BULK,
          quantity: 3,
          discount: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const { total } = await ordersService.estimateOrderTotal([
        'CC',
        'CC',
        'PC',
        'PC',
        'PC',
        'WA',
      ]);
      expect(total).toEqual(8.65);
    });

    it('estimate total with applying different types of discount', async () => {
      const ordersService = createMockedOrdersService();
      await createSampleData();
      await DiscountRule.query().insert([
        {
          productCode: 'CC',
          type: DiscountType.BOGOF,
          quantity: 0,
          discount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productCode: 'PC',
          type: DiscountType.BULK,
          quantity: 3,
          discount: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const { total } = await ordersService.estimateOrderTotal([
        'CC',
        'CC',
        'PC',
        'PC',
        'PC',
        'WA',
      ]);
      expect(total).toEqual(7.15);
    });

    it('fails to estimate total for empty codes list', async () => {
      const ordersService = createMockedOrdersService();

      await expect(ordersService.estimateOrderTotal([])).rejects.toThrow(
        'Invalid codes list',
      );
    });

    it('fails to estimate total for non-existings codes', async () => {
      const ordersService = createMockedOrdersService();

      await expect(ordersService.estimateOrderTotal(['WW'])).rejects.toThrow(
        'Invalid codes list',
      );
    });
  });
});
