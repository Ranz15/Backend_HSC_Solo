"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      seller.hasMany(models.product, { foreignKey: "seller_id" });
    }
  }
  seller.init(
    {
      fullName: DataTypes.STRING,
      dateofBirth: DataTypes.DATEONLY,
      address: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      phone_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "seller",
    }
  );
  return seller;
};
