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
    // Desestruturando o corpo da solicitação
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
