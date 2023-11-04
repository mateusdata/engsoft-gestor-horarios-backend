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
