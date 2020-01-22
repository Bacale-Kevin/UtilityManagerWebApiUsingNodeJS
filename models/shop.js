const Sequelize = require("sequelize");

const sequelize = require("../server");

const Shop = sequelize.define("shop", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  location: Sequelize.STRING, 
  name: Sequelize.STRING,
  date: Sequelize.DATE
});

module.exports = {
  Shop
};
