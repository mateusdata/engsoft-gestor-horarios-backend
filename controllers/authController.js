const jwt = require("jsonwebtoken");
const DB = require("../config/database");
const chaveSecreta = "mateus";
const bcrypt = require('bcrypt');

function login(req, res) {
  const { email, senha } = req.body;
  console.log(email, senha);
  const sql = "SELECT * FROM usuarios where email = ? ";
 
}

function getUsers(req, res) {
  DB.query("SELECT nome, email, cargo FROM usuarios", (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err);
      res.status(500).json({ error: "Erro ao buscar dados de usuário" });
    } else {
      res.json(results);
    }
  });
}


function isLogged(req, res){
  res.send("esta logado sim");
}

module.exports = { login, getUsers, isLogged };
