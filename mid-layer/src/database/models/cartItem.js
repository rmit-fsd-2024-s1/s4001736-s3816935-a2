module.exports = (sequelize, DataTypes) =>
  sequelize.define("cartItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    }, 
    item_total_price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
