const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize")
class Bsi extends Model {}

Bsi.init({
  id: {
    type: DataTypes.CHAR,
    allowNull: false,
    primaryKey: true,
  },
  dia: {
    type: DataTypes.STRING,
  },
  prim_hor: {
    type: DataTypes.STRING,
  },
  prim_hor_materia: {
    type: DataTypes.STRING,
  },
  segu_hor: {
    type: DataTypes.STRING,
  },
  segu_hor_materia: {
    type: DataTypes.STRING,
  },
  terc_hor: {
    type: DataTypes.STRING,
  },
  terc_hor_materia: {
    type: DataTypes.STRING,
  },
  quar_hor: {
    type: DataTypes.STRING,
  },
  quar_hor_materia: {
    type: DataTypes.STRING,
  },
  quin_hor: {
    type: DataTypes.STRING,
  },
  quin_hor_materia: {
    type: DataTypes.STRING,
  },
  sext_hor: {
    type: DataTypes.STRING,
  },
  sext_hor_materia: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Bsi',
  tableName: 'bacharelado_si',
  timestamps: false,
});

module.exports = Bsi;