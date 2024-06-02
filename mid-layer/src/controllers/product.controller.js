const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  const products = await db.product.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(products);
};

exports.update = async (req, res) => {
  const product = await db.product.findByPk(req.body.product_id);
  
  product.product_score = req.body.product_score; 
  product.num_of_reviews = req.body.num_of_reviews; 
  product.total_score = req.body.total_score; 

  await product.save();

  res.json(product);
};

