import { RESOLVER } from 'awilix';

import User from 'src/models/User';
import { generatePassword } from 'src/util/bcrypt';

interface CreateUserInput {
  email: string;
  password: string;
}

export default class UsersService {
  static [RESOLVER] = {
    name: 'usersService',
  };

  async findById(userId: number): Promise<User | null> {
    return User.query().findById(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.query().findOne({ email });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const passwordHash = await generatePassword(input.password);

    return User.query().insert({
      email: input.email,
      passwordHash,
    });
  }
}
