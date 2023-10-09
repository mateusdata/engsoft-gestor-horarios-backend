const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const DB = require("../config/database");

const chaveSecreta = "mateus";

function register(req, res) {
  const sql = `
  INSERT INTO usuarios (nome, email, senha, tipo, matricula, departamento, cargo )
VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const { cargo, departamento, email, matricula, nome, senha, tipo } = req.body;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    bcrypt.hash(senha, salt, function(err, hash) {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      
      DB.query(sql,[nome, email, hash, tipo, matricula, departamento, cargo], (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.status(200).send(result);
        }
      });
    });
  });
}

module.exports = { register };
