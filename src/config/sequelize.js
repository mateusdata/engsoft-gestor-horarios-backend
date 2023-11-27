const { Sequelize } = require('sequelize');
const pg = require('pg');


/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: mysql2, // Usar o pacote mysql2 se nao usar isso nao da pra subir a api na vercel
  //essa foi a forma que eu achei pra corrigir o bug
});
*/
const sequelize = new Sequelize(
  process.env.psql,
   {
  dialect: 'postgres',
  dialectModule: pg, // Usar o pacote mysql2 se nao usar isso nao da pra subir a api na vercel
  //essa foi a forma que eu achei pra corrigir o bug
});
/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
*/
module.exports = sequelize;
