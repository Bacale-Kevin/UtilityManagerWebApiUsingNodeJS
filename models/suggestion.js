const Sequelize = require("sequelize");

const sequelize = require("../server");

const Suggestion = sequelize.define("suggestion", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  body: Sequelize.STRING
});

module.exports = {
  Suggestion
};
