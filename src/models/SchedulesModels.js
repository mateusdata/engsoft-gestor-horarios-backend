const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize");

class Horarios extends Model {}

Horarios.init({

});

module.exports = Horarios;