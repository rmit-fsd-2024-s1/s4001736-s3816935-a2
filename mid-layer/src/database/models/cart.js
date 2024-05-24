module.exports = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
