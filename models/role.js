const Sequelize = require("sequelize");

const sequelize = require("../server");

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = {
  Role
};
