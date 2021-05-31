import { gql } from 'apollo-server-express';

export const order = gql`
    input EstimateOrderInput {
        productsList: [String!]!
    }

    type EstimateOrderResult {
        total: Float!
    }

    extend type Query {
        estimateOrder(input: EstimateOrderInput): EstimateOrderResult!
    }
`;
