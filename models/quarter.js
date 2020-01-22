const Sequelize = require("sequelize");

const sequelize = require("../server");

const Quarter = sequelize.define("quarter", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = {
  Quarter
};
