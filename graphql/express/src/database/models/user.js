module.exports = (db, DataTypes) =>
  db.sequelize.define("user", {
    username: {
      type: DataTypes.STRING(32),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    joining_date: {
      type: DataTypes.STRING(32), 
      allowNull: false
    }, 
    curr_cart: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }, 
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });


  