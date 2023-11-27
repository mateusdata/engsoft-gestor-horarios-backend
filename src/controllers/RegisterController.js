/**
 * Módulo para lidar com o registro de usuários.
 * @module RegisterController
 */

// Importando módulos necessários
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

/**
 * Classe para lidar com o registro de usuários.
 */
class RegisterController {
  /**
   * Método assíncrono para registrar um novo usuário.
   * @param {Object} req - O objeto de solicitação HTTP.
   * @param {Object} res - O objeto de resposta HTTP.
   */
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
      // Gerando o salt e o hash da senha
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(senha, salt);

      // Criando um novo usuário
      const user = await UserModel.create({
        nome,
        email,
        senha: hash,
        matricula,
        departamento,
        cargo,
        administrador,
      });

      // Enviando a resposta de sucesso
      res.status(200).send("Cadastro realizado com sucesso!");
    } catch (error) {
      // Lidando com erros
      res.status(500).send({ error: error.message });
      console.log(error);
    }
  }
}

// Exportando a instância da classe
module.exports = new RegisterController();


*/