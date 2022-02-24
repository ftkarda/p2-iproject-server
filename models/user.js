'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: models.Transaction})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "username is required",
        },
        notNull: {
          msg: "username is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email is required",
        },
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          msg: "invalid email format"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required",
        },
        notNull: {
          msg: "password is required",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "address is required",
        },
        notNull: {
          msg: "address is required",
        },
      },
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
    },
    modelName: 'User',
  });
  return User;
};