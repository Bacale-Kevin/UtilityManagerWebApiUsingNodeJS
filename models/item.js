const Sequelize = require("sequelize");
const Category = require("./category");

const sequelize = require("../server");

const Item = sequelize.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  date: Sequelize.DATE,
  model: Sequelize.STRING
});

module.exports = {
  Item
};
