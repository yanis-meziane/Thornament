import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const crypt = async (value) => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

export const compare = async (value, hash) => {
  return bcrypt.compare(value, hash);
};
