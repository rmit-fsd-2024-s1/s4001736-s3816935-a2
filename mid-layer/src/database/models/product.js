module.exports = (sequelize, DataTypes) =>
  sequelize.define("product", {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    },
    product_image: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    is_special: {
      type: DataTypes.BOOLEAN, 
      allowNull: false
    }, 
    product_score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    num_of_reviews: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }, 
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
