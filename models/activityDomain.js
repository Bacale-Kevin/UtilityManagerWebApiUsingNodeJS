const Sequelize = require("sequelize");

const sequelize = require("../server");

const ActivityDomain = sequelize.define("activityDomain", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING
});

module.exports = {
  ActivityDomain
};
