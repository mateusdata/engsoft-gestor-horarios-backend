const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql' // ou 'mariadb' | 'postgres' | 'mssql'
});

class HorarioProfessor extends Model {}

HorarioProfessor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  professor_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  dia_semana: { type: DataTypes.ENUM('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') },
  hora_inicio: { type: DataTypes.TIME },
  hora_fim: { type: DataTypes.TIME }
}, {
  sequelize,
  modelName: 'HorarioProfessor',
});
