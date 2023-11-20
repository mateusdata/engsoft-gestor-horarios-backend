
/**
 * @fileoverview Este arquivo define a configuração do Sequelize para conectar ao banco de dados MySQL.
 * @requires sequelize
 * @requires mysql2
 */

/**
 * Importa o objeto Sequelize do pacote 'sequelize'.
 * Importa o pacote 'mysql2'.
 */
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const pg = require('pg');

<<<<<<< HEAD
/**
 * Cria uma nova instância do Sequelize para a nossa aplicação.
 * @type {Sequelize}
 * @const
 * @namespace sequelize
 * @property {string} process.env.DB_DATABASE - O nome do banco de dados.
 * @property {string} process.env.DB_USERNAME - O nome de usuário para o banco de dados.
 * @property {string} process.env.DB_PASSWORD - A senha para o banco de dados.
 * @property {object} options - Um objeto contendo opções de configuração.
 * @property {string} options.host - O host do banco de dados.
 * @property {string} options.port - A porta do banco de dados.
 * @property {string} options.dialect - O dialeto do banco de dados a ser usado. Neste caso, 'mysql'.
 * @property {module:mysql2} options.dialectModule - O módulo de dialeto a ser usado. Neste caso, 'mysql2'.
 */
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
=======

/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
>>>>>>> main
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: mysql2,
});
<<<<<<< HEAD

/**
 * Autentica a conexão com o banco de dados.
 * Em caso de sucesso, loga uma mensagem no console.
 * Em caso de erro, loga o erro no console.
 */
=======
*/
const sequelize = new Sequelize(
  process.env.psql,
   {
  dialect: 'postgres',
  dialectModule: pg, // Usar o pacote mysql2 se nao usar isso nao da pra subir a api na vercel
  //essa foi a forma que eu achei pra corrigir o bug
});
>>>>>>> main
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

/**
 * Exporta a instância do Sequelize.
 */
module.exports = sequelize;






