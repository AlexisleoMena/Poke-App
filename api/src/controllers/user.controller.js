const { User } = require("../db.js");

const createUser = async (req, res) => {
  let { email } = req.params;
  try {
    let [user, created] = await User.findOrCreate({ where: { email }, defaults: { email } });
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const getAllUsers = async (req, res) => {
  try {
    let users = User.findAll()
    res.send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  createUser,
  getAllUsers
}