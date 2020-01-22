const Sequelize = require('sequelize');

const sequelize = new Sequelize("demo", "postgres", "bacale", {
    // logging: false,
    host: "localhost",
    dialect: "postgres",
    define: {
      timestamps: false
    },
  });
  
  module.exports = sequelize;