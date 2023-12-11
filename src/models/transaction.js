"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  transaction.init(
    {
      product_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      date_order: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
