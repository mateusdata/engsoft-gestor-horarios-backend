const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const chaveSecreta = "mateus";
const { HorarioProfessor } = require('../models/UserModel'); // Importe o modelo do usuário

async function login(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await HorarioProfessor.findOne({ where: { email } });
    if (usuario) {
      bcrypt.compare(senha, usuario.senha, function(err, isMatch) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        if (isMatch) {
          const token = jwt.sign({ id_token: 3 }, chaveSecreta, {
            expiresIn: "3s", //duração em segundos
          });
          return res.send({ token, nome: usuario.nome });
        } else {
          return res.status(400).json({ status: 401, message: "Senha incorreta" });
        }
      });
    } else {
      return res.status(400).json({ status: 401, message: "Usuario inexistente" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Ouve um erro no banco de dados." });
  }
}

async function getUsers(req, res) {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['nome', 'email', 'cargo'] });
    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao executar a consulta:", err);
    res.status(500).json({ error: "Erro ao buscar dados de usuário" });
  }
}

function isLogged(req, res){
  res.send("esta logado sim");
}

module.exports = { login, getUsers, isLogged };
