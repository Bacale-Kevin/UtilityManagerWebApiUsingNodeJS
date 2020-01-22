const Sequelize = require("sequelize");

const sequelize = require("../server");

const Resupply = sequelize.define("resupply", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  oldStockQuantity: Sequelize.DOUBLE,
  newQuantity: Sequelize.DOUBLE,
  date: Sequelize.DATE
});

module.exports = {
  Resupply
};
