const Sequelize = require("sequelize");

const sequelize = require("../server");

const Town = sequelize.define("town", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = {
  Town
};
