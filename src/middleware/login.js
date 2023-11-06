/**
 * @fileoverview Este arquivo define um middleware para autenticação de usuários.
 * @requires jsonwebtoken
 */

/**
 * Importa o pacote 'jsonwebtoken'.
 * Define a chave secreta para a verificação do token.
 */
const jwt = require("jsonwebtoken");
const chaveSecreta = "mateus";

/**
 * Define o middleware para autenticação de usuários.
 * @param {object} req - O objeto de solicitação do Express.
 * @param {object} res - O objeto de resposta do Express.
 * @param {function} next - A função next do Express para passar o controle para o próximo middleware.
 */
const middlewareUser = (req, res, next) => {
  // Recupera o token do cabeçalho da solicitação.
  const tokenHeader = req.header("Authorization");
  
  // Se não houver token, retorna um erro 403 (Acesso Negado).
  if (!tokenHeader) {
    return res.status(403).send("Acesso negado");
  }

  // Extrai o token do cabeçalho.
  const token = tokenHeader.split(" ")[1];

  try {
    // Verifica o token usando a chave secreta.
    jwt.verify(token, chaveSecreta, (err, decode) => {
      // Se houver um erro na verificação, retorna um erro 401 (Não Autorizado).
      if (err) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
      }
      // Se a verificação for bem-sucedida, anexa o id do token à solicitação e passa o controle para o próximo middleware.
      req.id_token = decode.id_token;
      next();
    });
  } catch {
    // Se houver um erro interno, retorna um erro 500 (Erro Interno do Servidor).
    return res.status(500).json({ message: "Erro interno no servidor", token });
  }
};

/**
 * Exporta o middleware de autenticação do usuário.
 */
module.exports = middlewareUser;
