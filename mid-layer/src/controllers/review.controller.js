const db = require("../database");

exports.all = async (req, res) => {
  const reviews = await db.review.findAll({ where: {product_id: req.query.product_id}, include: {model: db.user, as: "user"}});

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(reviews);
};

exports.one = async (req, res) => {
  const review = await db.review.findByPk(req.params.id);

  res.json(review);
};

exports.create = async (req, res) => {
  const review = await db.review.create({
    rating: req.body.rating,
    text: req.body.text, 
    username: req.body.username, 
    product_id: req.body.product_id, 
    flagged: false, 
    deleted: false
  });

  res.json(review);
};

exports.update = async (req, res) => {
  const review = await db.review.findByPk(req.body.review_id);
  
  review.rating = req.body.rating; 
  review.text = req.body.text; 

  await review.save();

  res.json(review);
};

exports.delete = async (req, res) => {
  const review = await db.review.findByPk(req.params.id);

  await review.destroy();
  res.json(review);
}
