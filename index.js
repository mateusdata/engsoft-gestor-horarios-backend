const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./src/routes/auth");
const ApiRouter = require("./src/routes/api");
const port = process.env.PORT || 3001;
const ResetController = require("./src/controllers/ResetController");
const TesteController = require("./src/controllers/TesteController");
const sequelize = require("./src/config/sequelize");
const SchedulesController = require("./src/controllers/SchedulesController");
app.use("/", AuthRouter);
app.use("/", ApiRouter);
app.get("/", function (req, res) {
  res.send({ projeto: "API Gestor de Horáios"});
});

app.post("/recuperaremail", ResetController.recuperarEmail);
app.post("/validarcodigo", ResetController.validarCodigo);
app.post("/resetarsenha", ResetController.resetarSenha);
app.get("/rotateste", TesteController.testarBanco);
app.get("/teacher_list", SchedulesController.show_teacher);
app.listen(port, () => {
   console.log("Servidor rodando na porta " + port);
});