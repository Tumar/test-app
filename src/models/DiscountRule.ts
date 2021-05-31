import { JSONSchema } from 'objection';

import { DiscountRules } from 'src/__generated/osm';

import { createBaseModel } from './BaseModel';

export enum DiscountType {
  // NOTE: Buy One Get One Free
  BOGOF = 'bogof',
  BULK = 'bulk',
}

interface DiscountRuleColumns extends DiscountRules {
  // override complex columns
  type: DiscountType;
}

export default class DiscountRule extends createBaseModel<DiscountRuleColumns>({
  autoUpdatedColumns: ['createdAt', 'updatedAt'],
}) {
  static tableName = 'discount_rules';

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['productCode', 'type', 'discount', 'quantity'],

    properties: {
      id: { type: 'integer' },
      productCode: { type: 'string' },
      type: {
        type: 'string',
        enum: Object.values(DiscountType),
      },
      discount: { type: 'number' },
      quantity: { type: 'number' },
    },
  };
}
