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
 * Index.js aquivor que inicia o servidor, 
 * Porta padrão para o servidor express 3001.
 */
const port = process.env.PORT || 3001;

const ResetController = require("./src/controllers/ResetController");
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
 * Redefine a senha do usuário.
 */
app.post("/resetarsenha", ResetController.resetarSenha);

/**
 * Obtém a lista de professores.
 */
app.get("/teacher_list", TeachersController.show_teacher);

/**
 * Obtém os dados atuais do professor com base na matrícula fornecida.
 */
app.get("/dadosatuais/:matricula", TeachersController.dadosAtuaisProfessor);

/**
 * Atualiza os dados do professor.
 */
app.put("/atualizarprofessor", TeachersController.atualizarProfessor);

/**
 * Mostra o horário.
 */
app.get("/horarios", ScheduleController.mostrarHorario);


app.listen(port, () => {
   console.log("Servidor rodando na porta " + port);
});
