const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

//Os commit serão feito na feature/newmaster
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});
  
app.get('/users', function (req, res) {
    db.query('SELECT nome, email, cargo FROM usuarios', (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao buscar dados de usuário' });
      } else {
        res.json(results);
      }
    });
  });
  
app.get('/', function (req, res) {
  res.send({name:"Projeto de engenharia do sofware", version:"6° semestre"})
})

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001")
});
