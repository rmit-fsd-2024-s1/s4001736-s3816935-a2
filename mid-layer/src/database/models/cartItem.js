module.exports = (sequelize, DataTypes) =>
  sequelize.define("cartItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
