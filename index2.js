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
const TesteController = require("./src/controllers/TesteController");
const ScheduleController = require("./src/controllers/ScheduleController");
const sequelize = require("./src/config/sequelize");
const TeachersController = require("./src/controllers/TeachersController");
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
app.get("/rotateste", TesteController.testarBanco);
app.get("/teacher_list", TeachersController.show_teacher);
app.get("/dadosatuais/:matricula", TeachersController.dadosAtuaisProfessor);
app.post("/atualizarprofessor", TeachersController.atualizarProfessor);
app.get("/horarios", ScheduleController.mostrarHorario);
app.listen(port, () => {
   console.log("Servidor rodando na porta " + port);
});
