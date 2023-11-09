const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

class RegisterController {
  async register(req, res) {
    try {
      let usersToRegister = [];

      if (Array.isArray(req.body)) {
        usersToRegister = req.body;
      } else if (typeof req.body === 'object') {
        usersToRegister.push(req.body);
      } else {
        return res.status(400).send({ error: 'Entrada inválida' });
      }

      const salt = await bcrypt.genSalt(10);
      for (const user of usersToRegister) {
        const hash = await bcrypt.hash(user.senha, salt);
        await UserModel.create({
          nome: user.nome,
          email: user.email,
          senha: hash,
          matricula: user.matricula,
          departamento: user.departamento,
          cargo: user.cargo,
          administrador: user.administrador,
        });
      }

      res.status(200).send("Cadastro realizado com sucesso!");
    } catch (error) {
      res.status(500).send({ error: error.message });
      console.error(error);
    }
  }
}

module.exports = new RegisterController();



/*

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

class RegisterController {
  async register(req, res) {
    const { cargo, departamento, email, matricula, nome, senha,  administrador } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(senha, salt);
      const user = await UserModel.create({
        nome,
        email,
        senha: hash,
        matricula,
        departamento,
        cargo,
        administrador,
      });
      res.status(200).send("Cadastro realizado com sucesso!");
    } catch (error) {
      res.status(500).send({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = new RegisterController();


*/