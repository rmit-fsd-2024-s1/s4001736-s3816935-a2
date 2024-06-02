module.exports = (db, DataTypes) =>
  db.sequelize.define("review", {
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
    username: {
      type: DataTypes.STRING(254),
      allowNull: false,
      references: {
        model: db.user,
        key: "username"
      }
    },
    product_id: {
      type: DataTypes.STRING(254),
      allowNull: false,
      references: {
        model: db.product,
        key: "product_id"
      }
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
