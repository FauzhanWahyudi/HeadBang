'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
    }

    //  >>>>> Sorting Product By Category <<<<<
    static async getProductsByCategory(category) {
      try {
        let option = { 
          include : {
            model: sequelize.models.Category,
            required: true,
          },
        };
        option.include.where = {};
        option.include.where.id = category;
        let data = await Product.findAll(option);
        
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};