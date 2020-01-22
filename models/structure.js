const Sequelize = require("sequelize");

const sequelize = require("../server");

const Structure = sequelize.define("structure", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  location: Sequelize.STRING, 
  name: Sequelize.STRING,
  poBox: Sequelize.STRING,
  phone: Sequelize.STRING
});

module.exports = {
  Structure
};
