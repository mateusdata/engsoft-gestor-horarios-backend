const jwt = require("jsonwebtoken");
const chaveSecreta = "mateus";
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");

class AuthController {
  async login(req, res) {
    const { email, senha } = req.body;
    console.log(email, senha);

    try {
      const user = await UserModel.findOne({
        where: { email: email }
      });

      if (!user) {
        return res.status(400).json({ status: 401, message: "Usuário inexistente" });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);

      if (isMatch) {
        const token = jwt.sign({ id_token: 3 }, chaveSecreta, {
          expiresIn: "5m",
        });
        return res.send({ token, nome: user.nome });
      } else {
        return res.status(400).json({ status: 401, message: "Senha incorreta" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Ocorreu um erro no banco de dados." });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserModel.findAll({
        attributes: ['nome', 'email', 'cargo']
      });
      res.send(users);
    } catch (err) {
      console.error("Erro ao buscar dados de usuário:", err);
      res.status(500).json({ error: "Erro ao buscar dados de usuário" });
    }
  }

  isLogged(req, res) {
    res.send("está logado sim");
  }
}

module.exports = new AuthController();
