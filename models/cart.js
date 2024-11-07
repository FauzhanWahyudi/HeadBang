'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsToMany(models.User, {through: 'UserCarts'})
      Cart.belongsToMany(models.Product, {through: 'CartProducts'})
    }
  }
  Cart.init({
    price: DataTypes.INTEGER,
    bonus: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
  }, {
    hooks:{
      beforeCreate: (cart) => {
        cart.isDone = false
      },
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};