import OrdersService from 'src/services/orders';

interface EstimateOrderInput {
  input: {
    productsList: string[];
  }
}

export default {
  estimateOrder: async (_root: any, args: EstimateOrderInput, { diContainer }: GraphQLContext) => {
    const ordesService = diContainer.resolve<OrdersService>('ordersService');
    const { total } = await ordesService.estimateOrderTotal(args.input.productsList);

    return {
      total,
    };
  },
};
