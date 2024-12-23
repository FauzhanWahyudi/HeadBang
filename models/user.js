'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get username(){
      return this.email.split('@')[0].toLowerCase()
    }

    static associate(models) {
      // define association here
      User.hasOne(models.Store)
      User.belongsToMany(models.Cart, {through: 'UserCarts'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty:{
          msg: 'Email is required'
        },
        notNull:{
          msg: 'Email is required'
        },
        validateEmail(value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(!emailRegex.test(value)) {
            throw `Please input right email`
          };
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Password is required'
        },
        notNull:{
          msg: 'Password is required'
        },
        checkLength(value) {
          if(value.length < 8) {
            throw `Minimum password length 8`
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Role is required'
        },
        notNull:{
          msg: 'Role is required'
        }
      }
    },
    point: DataTypes.INTEGER,
    isValidate: DataTypes.BOOLEAN
  }, {
    hooks:{
      beforeCreate: (user) =>{
        user.point = 0;
        //hasing password
        let salt = bcrypt.genSaltSync(10); //kasih salt
        //ganti password dengan hash
        user.password = bcrypt.hashSync(user.password, salt);
        user.isValidate = false;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};