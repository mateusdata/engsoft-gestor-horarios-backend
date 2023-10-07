const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

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


app.get('/criar-tabela-aulas', function (req, res) {
    const sql = `
      CREATE TABLE IF NOT EXISTS aulas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_professor VARCHAR(255) NOT NULL,
        materia VARCHAR(255) NOT NULL,
        disponibilidade_em_dias INT NOT NULL
      )
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao criar a tabela "aulas":', err);
        res.status(500).json({ error: 'Erro ao criar a tabela "aulas"' });
      } else {
        res.json({ message: 'Tabela "aulas" criada com sucesso' });
      }
    });
  });

  app.get('/inserir-aula', function (req, res) {
    const nomeProfessor = 'Professor Teste';
    const materia = 'Matéria de Teste';
    const disponibilidadeEmDias = 5; 
  
    const sql = 'INSERT INTO aulas (nome_professor, materia, disponibilidade_em_dias) VALUES (?, ?, ?)';
  
 
    const values = [nomeProfessor, materia, disponibilidadeEmDias];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Erro ao inserir aula:', err);
        res.status(500).json({ error: 'Erro ao inserir aula' });
      } else {
        res.json({ message: 'Aula inserida com sucesso' });
      }
    });
  });
  
  
app.get('/users', function (req, res) {
    db.query('SELECT * FROM users', (err, results) => {
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
