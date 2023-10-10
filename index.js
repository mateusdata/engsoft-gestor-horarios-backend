const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/user");
const ApiRouter = require("./routes/api");
//const DB = require("./config/database");
const port = process.env.PORT || 3001;

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

app.use("/auth", AuthRouter);
app.use("/user", ApiRouter);

app.get("/vercel", function (req, res) {
  res.send({name: "Api esta no computador local, tenha paciencia","Porta do servidor": port});
});
app.get("/", function (req, res) {
  let sql = `select * from disciplinas`
  DB.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).send({ error: "Ouve um erro no banco de dados." });
    }
    res.send(results);

  });
});
  
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
