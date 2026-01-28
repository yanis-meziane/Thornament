import db from "../db/db.js";

const User = {
  async create({ email, hashedPassword }) {
    return db.one(
      `
      INSERT INTO users (mail, password)
      VALUES ($1, $2)
      RETURNING id, mail
      `,
      [email, hashedPassword]
    );
  },

  async findOne({ email }) {
    return db.oneOrNone(
      `
      SELECT id, mail, password
      FROM users
      WHERE mail = $1
      `,
      [email]
    );
  },

  async findById(id) {
    return db.oneOrNone(
      `
      SELECT id, mail
      FROM users
      WHERE id = $1
      `,
      [id]
    );
  },
};

export default User;
