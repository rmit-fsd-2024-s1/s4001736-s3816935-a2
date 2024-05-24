const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    first_name: req.body.first_name,
    last_name: req.body.last_name, 
    joining_date: req.body.joining_date, 
    curr_cart: req.body.curr_cart
  });

  res.json(user);
};

// Update a user. 
exports.update = async (req, res) => {
  console.log(req.body.username)
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  const user = await db.user.findByPk(req.body.username);
  
  console.log(req.body);
  // Update user.
  user.password_hash = hash;
  user.first_name = req.body.first_name; 
  user.last_name = req.body.last_name; 

  await user.save();

  res.json(user);
};

exports.updateCart = async (req, res) => {
  const user = await db.user.findByPk(req.body.username);

  user.curr_cart = req.body.cart_id; 

  await user.save(); 
  res.json(user);
}

exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  await user.destroy();
  res.json(user);
}

