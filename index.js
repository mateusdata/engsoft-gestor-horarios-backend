const express = require("express");
const cors = require("cors");
const app = express();

/**
 * Middleware para analisar o corpo das solicitações como JSON.
 */
app.use(express.json());

/**
 * Middleware para habilitar o CORS.
 */
app.use(cors());

const AuthRouter = require("./src/routes/auth");
const ApiRouter = require("./src/routes/api");

/**
 * Porta padrão para o servidor express.
 */
const port = process.env.PORT || 3001;

const ResetController = require("./src/controllers/ResetController");

/**
 * Rotas de autenticação.
 */
app.use("/", AuthRouter);

/**
 * Rotas da API.
 */
app.use("/", ApiRouter);

/**
 * Rota raiz que retorna informações sobre o projeto e as rotas disponíveis.
 */
app.get("/", function (req, res) {
  res.send({ projeto: "API Gestor de Horáios"});
});

/**
 * Rota para recuperar o email do usuário.
 */
app.post("/recuperaremail", ResetController.recuperarEmail);

/**
 * Rota para validar o código de recuperação do usuário.
 */
app.post("/validarcodigo", ResetController.validarCodigo);

/**
 * Rota para redefinir a senha do usuário.
 */
app.post("/resetarsenha", ResetController.resetarSenha);

/**
 * Rota para testar a conexão com o banco de dados.
 */

/**
 * Inicia o servidor na porta especificada.
 */
app.listen(port, () => {
   console.log("Servidor rodando na porta " + port);
});
