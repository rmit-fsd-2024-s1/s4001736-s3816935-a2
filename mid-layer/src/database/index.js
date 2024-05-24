// import product0 from "../../../frontend/src/images/"

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
// db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user.
db.cart.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.cartItem.belongsTo(db.cart, { foreignKey: { name: "cart_id", allowNull: false } });
db.cartItem.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });

// db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
// db.review.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
// db.review.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const productCount = await db.product.count(); 
  const count = await db.user.count();

  if(productCount < 1) {
    await db.product.create({ product_name: "Beef Rump Steak (300g)", product_price: 9.75, product_image: "../../../frontend/src/images/beefsteak.png", is_special: true })
    await db.product.create({ product_name: "Chicken Thigh (450g)", product_price: 15.07, product_image: "/static/media/chickenthigh.26fab059c7f42f83f41b.png", is_special: true })
    await db.product.create({ product_name: "Apples (6 pack)", product_price: 7.80, product_image: "/static/media/apples.b6f38510565e7f3f40a0.png", is_special: true })
    await db.product.create({ product_name: "Mini Melon", product_price: 8.10, product_image: "/static/media/watermulon.1754846255b00c4238bf.png", is_special: true })
    await db.product.create({ product_name: "Extra Lean Beef Mince (500g)", product_price: 15.00, product_image: "/static/media/beefmince.34c0f85b9bf425500bb9.png", is_special: false })
    await db.product.create({ product_name: "Beef Sausages Gluten Free (450g)", product_price: 10.50, product_image: "/static/media/beefsausages.1f0e9e515885f288976e.png", is_special: false })
    await db.product.create({ product_name: "Lamb Mince (500g)", product_price: 10.00, product_image: "/static/media/lambmince.1d23c598e807537df118.png", is_special: false })
    await db.product.create({ product_name: "Chicken Drumsticks (420g)", product_price: 4.20, product_image: "/static/media/chickendrumstick.cc943c68902bebb59638.png", is_special: false })
    await db.product.create({ product_name: "Bananas (each)", product_price: 1.02, product_image: "/static/media/bananas.8f59848acee3ad39d6d4.png", is_special: false })
    await db.product.create({ product_name: "Pears (4 pack)", product_price: 5.90, product_image: "/static/media/pears.94165c7415bc0ce7775b.png", is_special: false })
    await db.product.create({ product_name: "Baby Spinach", product_price: 4.80, product_image: "/static/media/babyspinach.ab71f1fb0875e4f6f169.png", is_special: false })
    await db.product.create({ product_name: "Carrots", product_price: 5.80, product_image: "/static/media/carrots.03dce338b42f60630591.png", is_special: false })
    await db.product.create({ product_name: "Zucchini", product_price: 5.50, product_image: "/static/media/zucchini.481e9e28b57959646224.png", is_special: false })
    await db.product.create({ product_name: "Broccoli", product_price: 9.90, product_image: "/static/media/broccoli.a97ea184f9cd7430f51c.png", is_special: false })
  }

  // Only seed data if necessary.
  if(count > 0)
    return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({ username: "mbolger", password_hash: hash, first_name: "Matthew", last_name : "Bolger", joining_date: "2024", curr_cart: 0 });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra", joining_date: "2024", curr_cart: 0});

  hash = await argon2.hash("1qa2ws3ed", { type: argon2.argon2id });
  await db.user.create({ username: "Delta", password_hash: hash, first_name: "Jacky", last_name : "Zhu", joining_date: "Sat May 04 2024", curr_cart: 0});
}

module.exports = db;
