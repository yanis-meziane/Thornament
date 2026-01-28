import bcrypt from 'bcrypt';

export default async function crypt(value) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(value, saltRounds);
  return hash;
}