import db from '../db/db.js';

export async function registerRepository(email, cryptedPassword) {
  return db.one('INSERT INTO users(mail, password) VALUES($1, $2) RETURNING (id, mail)', [email, cryptedPassword])
  .then(data => {
      return data; // print new user id;
  })
  .catch(error => {
      console.error("Error:", error)
      throw new Error(error); // print error;
  });
};

export async function loginRepository(email) {
  return await db.oneOrNone('SELECT * FROM users WHERE mail = $1', [email]);
};  