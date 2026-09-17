"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully in ${env} mode`);
  } catch (error) {
    console.error("Unable to connect to database:", error);
    throw error;
  }
};

db.syncModels = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("All models synced successfully");
  } catch (error) {
    console.error("Error syncing models:", error);
    throw error;
  }
};

module.exports = db;