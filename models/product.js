const Sequelize = require("sequelize");

const sequelize = require("../server");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  salesPrice: Sequelize.DOUBLE,
  sellerId: Sequelize.INTEGER,
  salesQuantity: Sequelize.DOUBLE,
  salesDetails: Sequelize.STRING,
  status: Sequelize.INTEGER
});

module.exports = {
  Product
};
