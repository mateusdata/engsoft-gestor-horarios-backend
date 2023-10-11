const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql' // ou 'mariadb' | 'postgres' | 'mssql'
});


class InscricaoAluno extends Model {}

InscricaoAluno.init({
  id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  aluno_id:{
    type :DataTypes.INTEGER,
    references:{
      model :Usuario,
      key :'id'
    }
  },
  horario_id:{
    type :DataTypes.INTEGER,
    references:{
      model :HorarioProfessor,
      key :'id'
    }
  }
},{
sequelize,
modelName:'InscricaoAluno',
});