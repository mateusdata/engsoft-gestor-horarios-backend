/**
 * Módulo para lidar com a autenticação de usuários.
 * @module AuthController
 */

// Importando módulos necessários
const jwt = require("jsonwebtoken");
const chaveSecreta = "mateus";
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");

/**
 * Classe para lidar com a autenticação de usuários.
 */
class AuthController {
  /**
   * Método assíncrono para autenticar um usuário.
   * @param {Object} req - O objeto de solicitação HTTP.
   * @param {Object} res - O objeto de resposta HTTP.
   */
  async login(req, res) {
    // Desestruturando o corpo da solicitação
    const { email, senha } = req.body;

    try {
      // Buscando o usuário no banco de dados
      const user = await UserModel.findOne({
        where: { email: email }
      });

      // Verificando se o usuário existe
      if (!user) {
        return res.status(400).json({ status: 401, message: "Usuário inexistente" });
      }

      // Verificando se a senha é válida
      const isValidUser = await bcrypt.compare(senha, user.senha);

      // Se o usuário é válido, gera um token e envia a resposta
      if (isValidUser) {
        const token = jwt.sign({ id_token:user.id}, chaveSecreta, {
          expiresIn: "500m",
        });
        return res.send({ token, nome: user.nome });
      } else {
        return res.status(400).json({ status: 401, message: "Senha incorreta"});
      }
    } catch (err) {
      // Lidando com erros
      console.error(err);
      res.status(500).send({ error: "Ocorreu um erro no banco de dados." });
    }
  }

  /**
   * Método assíncrono para buscar todos os usuários.
   * @param {Object} req - O objeto de solicitação HTTP.
   * @param {Object} res - O objeto de resposta HTTP.
   */
  async getUsers(req, res) {
    try {
      // Buscando todos os usuários no banco de dados
      const users = await UserModel.findAll({
        attributes: ['nome', 'email', 'cargo']
      });
      res.send(users);
    } catch (err) {
      // Lidando com erros
      console.error("Erro ao buscar dados de usuário:", err);
      res.status(500).json({ error: "Erro ao buscar dados de usuário" });
    }
  }

  /**
   * Método para verificar se o usuário está logado.
   * @param {Object} req - O objeto de solicitação HTTP.
   * @param {Object} res - O objeto de resposta HTTP.
   */
  isLogged(req, res) {
    res.send("está logado sim");
  }
}

// Exportando a instância da classe
module.exports = new AuthController();
