
const jwt = require('jsonwebtoken');
const DB = require("../config/database");
const chaveSecreta = "mateus"

function login(req, res) {
    console.log(req.body);
    const sql = "SELECT * FROM usuarios where email = 'leroy@example.com'";
    DB.query(sql, (err, results) => {
      if (err) {
        return res.send(err);
      }
      let isLogado = results[0].senha === req.body.senha;
      const user = {
        id: results[0].id,
        nome: results[0].nome,
        email: results[0].email,
      };
      console.log("Meu objeto", user);
      if (isLogado) {
        const token = jwt.sign({ id_token: 1 }, chaveSecreta, {
          expiresIn: "30s",
        });
        res.send(token);
      } else {
        res
          .status(401)
          .json({ status: 401, message: "Usuario ou senha incorretos" });
      }
    });
  }
  


function getUsers(req, res){
    DB.query("SELECT nome, email, cargo FROM usuarios", (err, results) => {
        if (err) {
          console.error("Erro ao executar a consulta:", err);
          res.status(500).json({ error: "Erro ao buscar dados de usuário" });
        } else {
          res.json(results);
        }
      });
}

module.exports = {login, getUsers};