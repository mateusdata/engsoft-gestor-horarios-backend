const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql' // ou 'mariadb' | 'postgres' | 'mssql'
});

class Usuario extends Model {}

Usuario.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  senha: { type: DataTypes.STRING },
  tipo: { type: DataTypes.ENUM('Aluno','Professor','Administrador') },
  matricula: { type: DataTypes.STRING },
  departamento: { type: DataTypes.STRING },
  cargo: { type: DataTypes.STRING },
  token: { type: DataTypes.STRING },
  expiracao_token: { type: DataTypes.DATE }
}, {
  sequelize,
  modelName: 'Usuario',
});
