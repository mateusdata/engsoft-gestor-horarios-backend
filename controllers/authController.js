const jwt = require("jsonwebtoken");
const DB = require("../config/database");
const chaveSecreta = "mateus";
const bcrypt = require('bcrypt');

function login(req, res) {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios where email = ? ";
  DB.query(sql, [email], (err, results) => {
    if (err) {
      res.status(500).send({ error: "Ouve um erro no banco de dados." });
    }
    if (results.length > 0) {
      bcrypt.compare(senha, results[0].senha, function(err, isMatch) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        if (isMatch) {
          const token = jwt.sign({ id_token: 3 }, chaveSecreta, {
            expiresIn: "12s", //duração em segundos
          });
          return res.send({ token, nome: results[0].nome });
        } else {
          return res.status(400).json({ status: 401, message: "Senha incorreta" });
        }
      });
    } else {
      return res.status(400).json({ status: 401, message: "Usuario inexistente" });
    }
  });
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
