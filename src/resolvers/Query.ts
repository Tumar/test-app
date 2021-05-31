import { guardUser } from 'src/util/auth';

import queryFields from './query-fields';

export const Query = {
  me: (_root: never, _args: never, { req }: GraphQLContext) => {
    const user = guardUser(req.user);

    return user;
  },
  ...queryFields,
};
