const db = require('../db.js');
class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newPersone = await db.query(
      `INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`,
      [name, surname]
    );
    res.json(newPersone.rows[0]);
  }
  async getUser(req, res) {
    // res.json('Успех и движ');
    const users = await db.query('SELECT * FROM person');
    res.json(users.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM person WHERE id = $1', [id]);
    res.json(user.rows[0]);
  }
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    const user = await db.query(
      'UPDATE person set name = $1, surname = $2 WHERE id = $3 RETURNING *',
      [name, surname, id]
    );
    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query('DELETE FROM person WHERE id = $1', [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
