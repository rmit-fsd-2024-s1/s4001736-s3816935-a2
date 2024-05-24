const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  const cartItems = await db.cartItem.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(cartItems);
};

exports.one = async (req, res) => {
  const item = await db.cartItem.findOne({where: {cart_id: req.query.cart_id, product_id: req.query.product_id }});

  if(item === null)
    res.json(null);
  else
    res.json(item);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const cartItem = await db.cartItem.create({
    quantity: req.body.quantity,
    price: req.body.price, 
    item_total_price: req.body.item_total_price, 
    cart_id: req.body.cart_id, 
    product_id: req.body.product_id
  });

  res.json(cartItem);
};

exports.update = async (req, res) => {
  const cartItem = await db.cartItem.findOne({where: {cart_id: req.body.cart_id, product_id: req.body.product_id }});
  
  // Update user.
  cartItem.quantity = req.body.quantity
  cartItem.item_total_price = req.body.item_total_price

  await cartItem.save();

  res.json(cartItem);
};
