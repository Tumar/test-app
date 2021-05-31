import bcrypt from 'bcryptjs';

const ROUND_SALTS = 10;

export const generatePassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(ROUND_SALTS);

  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  passwordHash: string,
): Promise<Boolean> => bcrypt.compare(password, passwordHash);
