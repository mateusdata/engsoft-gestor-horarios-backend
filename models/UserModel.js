const { Model, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = require("../config/sequelize")

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Aluno', 'Professor', 'Administrador'),
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING(20),
    defaultValue: null
  },
  departamento: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  cargo: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  token: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  expiracao_token: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'Usuario', // Nome do modelo
  tableName: 'usuarios', // Nome da tabela no banco de dados
  timestamps: false
});

module.exports = Usuario;
