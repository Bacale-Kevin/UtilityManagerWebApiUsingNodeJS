const Sequelize = require("sequelize");

const sequelize = require("../server");

const Stock = sequelize.define("stock", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  stockQuantity: Sequelize.DOUBLE,
  stockPrice: Sequelize.DOUBLE,
  date: Sequelize.DATE,
  name: Sequelize.STRING
});

module.exports = {
  Stock
};
