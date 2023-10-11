const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { defineUser } = require("./user-model");

const models = {};


const associateRelationships = () => {
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

const initModels = async () => {
  models.User = await defineUser(sequelize, Sequelize.DataTypes);

  associateRelationships();
  return models;
};

const getModels = () => models;

module.exports = {
  initModels,
  getModels,
};
