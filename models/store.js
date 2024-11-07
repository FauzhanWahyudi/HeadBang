'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User)
    }
  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty:{
          msg: 'Store name is required'
        },
        notNull:{
          msg: 'Store name is required'
        }
      }
    },
    productSales: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (store) => {
        store.productSales = 0;
      }
    },
    sequelize,
    modelName: 'Store',
  });
  return Store;
};