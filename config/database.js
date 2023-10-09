
require('dotenv').config();


const mysql = require("mysql2");

const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

DB.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: \n\n\n\n\n\n\n\n\n', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});
  
module.exports = DB;