import express from 'express';
import passport from 'passport';

import User from 'src/models/User';
import UsersService from 'src/services/users';

export const createAuthenticationMiddleware = ({ usersService }: { usersService: UsersService }) => {
  const authenticator = new passport.Authenticator();

  authenticator.serializeUser(
    (user: User, cb: (err: Error | null, userId: number) => void) => {
      cb(null, user.id);
    },
  );
  authenticator.deserializeUser(
    async (
      userId: number,
      cb: (err: Error | null, user: User | undefined) => void,
    ) => {
      const user = await usersService.findById(userId);

      cb(null, user);
    },
  );

  return express.Router().use(
    authenticator.initialize(),
    authenticator.session(),
  );
};
