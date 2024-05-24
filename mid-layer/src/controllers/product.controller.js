const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  const products = await db.product.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(products);
};

