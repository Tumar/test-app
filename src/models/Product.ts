import { JSONSchema } from 'objection';

import { Products } from 'src/__generated/osm';

import { createBaseModel } from './BaseModel';

export default class Product extends createBaseModel<Products>({
  autoUpdatedColumns: ['createdAt', 'updatedAt'],
}) {
  static tableName = 'products';

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['code', 'name', 'price'],

    properties: {
      id: { type: 'integer' },
      code: { type: 'string' },
      name: { type: 'string' },
      price: { type: 'number' },
    },
  };
}
