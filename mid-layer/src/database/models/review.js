module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    flagged: {
      type: DataTypes.BOOLEAN, 
      allowNull: false
    }, 
    deleted: {
      type: DataTypes.BOOLEAN, 
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
