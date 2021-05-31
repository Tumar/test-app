import { JSONSchema } from 'objection';

import { Users } from 'src/__generated/osm';
import { createBaseModel } from './BaseModel';

export default class User extends createBaseModel<Users>({
  autoUpdatedColumns: ['createdAt', 'updatedAt'],
}) {
  static tableName = 'users';

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['email', 'passwordHash'],

    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      passwordHash: { type: 'string' },
    },
  };
}
