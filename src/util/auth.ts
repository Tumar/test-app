import User from 'src/models/Product';

export const guardUser = (user: User | undefined | null) => {
  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
};
