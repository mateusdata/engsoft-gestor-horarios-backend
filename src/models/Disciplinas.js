const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize")

class Disciplinas extends Model {}

Disciplinas.init({
  cod: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  professor_um: {
    type: DataTypes.STRING,
  },
  professor_dois: {
    type: DataTypes.STRING,
  },
  turma: {
    type: DataTypes.STRING,
  },
  semana: {
    type: DataTypes.STRING,
  },
  horas: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Disciplinas',
  tableName: 'disciplinas',
  timestamps: false,
});

module.exports = Disciplinas;