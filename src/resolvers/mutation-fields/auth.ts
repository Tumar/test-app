import UsersService from 'src/services/users';
import { comparePasswords } from 'src/util/bcrypt';

interface SignUpArgs {
  input: {
    email: string;
    password: string;
  }
}

interface LoginArgs {
  input: {
    email: string;
    password: string;
  }
}

export default {
  signUp: async (_root: any, args: SignUpArgs, { diContainer, req }: GraphQLContext) => {
    if (req.user) {
      throw new Error('User is authenticated');
    }
    const usersService = diContainer.resolve<UsersService>('usersService');
    const existingUser = await usersService.findByEmail(args.input.email);
    if (existingUser) {
      throw new Error('User with such email already exists');
    }

    return usersService.createUser(args.input);
  },
  login: async (_root: any, args: LoginArgs, { diContainer, req }: GraphQLContext) => {
    const usersService = diContainer.resolve<UsersService>('usersService');
    const user = await usersService.findByEmail(args.input.email);
    if (!user) {
      // throw new Error(`No such user found for email: ${args.input.email}`);
      throw new Error('Invalid username or password');
    }

    const valid = await comparePasswords(args.input.password, user.passwordHash);
    if (!valid) {
      // throw new Error('Invalid password');
      throw new Error('Invalid username or password');
    }

    return new Promise((resolve, reject) => {
      req.logIn(user, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },
};
