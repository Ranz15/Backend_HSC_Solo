"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.categories, { foreignKey: "category_id" });
      product.belongsTo(models.seller, { foreignKey: "seller_id" });
      product.belongsToMany(models.buyer, {
        through: "transaction",
        foreignKey: "product_id",
      });
    }
  }
  product.init(
    {
      productName: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
