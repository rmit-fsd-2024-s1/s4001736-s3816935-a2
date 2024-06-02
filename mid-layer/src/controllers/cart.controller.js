const db = require("../database");

exports.all = async (req, res) => {
  const cart = await db.cart.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(cart);
};

exports.one = async (req, res) => {
  const cart = await db.cart.findByPk(req.params.id);

  res.json(cart);
};

exports.create = async (req, res) => {
  const cart = await db.cart.create({
    total_price: req.body.total_price,
    username: req.body.username
  });

  res.json(cart);
};

exports.update = async (req, res) => {
  const cart = await db.cart.findByPk(req.body.cart_id);
  
  // Update user.
  cart.total_price = req.body.total_price

  await cart.save();

  res.json(cart);
};

exports.delete = async (req, res) => {
  const cart = await db.cart.findByPk(req.params.id);

  await cart.destroy();
  res.json(cart);
}