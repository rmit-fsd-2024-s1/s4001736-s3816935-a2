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
db.user = require("./models/user.js")(db, DataTypes);
db.product = require("./models/product.js")(db, DataTypes);
db.review = require("./models/review.js")(db, DataTypes);

// Relate user and review.
db.review.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.user.hasMany(db.review, { foreignKey: { name: "username", allowNull: false } });

// Relate product and review.
db.review.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });
db.product.hasMany(db.review, { foreignKey: { name: "product_id", allowNull: false } });

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;

  // Create users. May need to: DROP TABLE "users"
  // await db.user.bulkCreate([
  //   { username: "username1", blocked: "0", first_name: "first_name1", last_name: "last_name1" },
  //   { username: "username2", blocked: "0", first_name: "first_name2", last_name: "last_name2" },
  //   { username: "username3", blocked: "0", first_name: "first_name3", last_name: "last_name3" },
  //   { username: "username4", blocked: "0", first_name: "first_name4", last_name: "last_name4" },
  //   { username: "username5", blocked: "0", first_name: "first_name5", last_name: "last_name5" }
  // ]);

  // // Create products. May need to: DROP TABLE "products"
  // await db.product.bulkCreate([
  //   { productname: "productname1", price: "10", amount: "10" },
  //   { productname: "productname2", price: "20", amount: "20" }
  // ]);

  // // Create reviews. May need to: DROP TABLE "reviews"
  // await db.review.bulkCreate([
  //   { id: 1, content: "review1 of productname1 from username1", username: "username1", productname: "productname1" },
  //   { id: 2, content: "review2 of productname2 from username1", username: "username1", productname: "productname2"  },
  //   { id: 3, content: "review3 of productname1 from username2", username: "username2", productname: "productname1"  },
  //   { id: 4, content: "review4 of productname2 from username2", username: "username2", productname: "productname2"  },
  //   { id: 5, content: "review5 of productname1 from username3", username: "username3", productname: "productname1"  },
  //   { id: 6, content: "review6 of productname2 from username3", username: "username3", productname: "productname2"  },
  //   { id: 7, content: "review7 of productname1 from username4", username: "username4", productname: "productname1"  },
  //   { id: 8, content: "review8 of productname2 from username4", username: "username4", productname: "productname2"  },
  //   { id: 9, content: "review9 of productname1 from username5", username: "username5", productname: "productname1"  },
  //   { id: 10, content: "review10 of productname2 from username5", username: "username5", productname: "productname2"  },
  // ]);
}

module.exports = db;
