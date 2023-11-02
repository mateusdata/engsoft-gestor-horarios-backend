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
app.use("/", AuthRouter);
app.use("/", ApiRouter);
app.get("/", function (req, res) {
  res.send({ projeto: "API de Engenharia de Software",
  rotas: [ "/auth/login", "/cadastro", "/teste", "/lista-usuarios", "/estalogado" ] });
});





app.get('/pedro', (req, res) => {
  const pessoas = [
    { nome: 'Pedro ', idade: 30 },
    { nome: 'Pedão', idade: 25 },
  ];
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Pessoas</title>
  </head>
  <body>
    <h1>Lista de Pessoas</h1>
    <ul>
      ${pessoas.map((pessoa, index) => `
        <li>
          <span onclick="mostrarAlerta('${pessoa.nome} - ${pessoa.idade} anos')">
            ${pessoa.nome} - ${pessoa.idade} anos
          </span>
        </li>
      `).join('')}
    </ul>

    <script>
      function mostrarAlerta(info) {
        alert('Você clicou em: ' + info);
      }
    </script>
  </body>
  </html>
`;
  res.send(htmlContent);
});

app.post("/recuperaremail", ResetController.recuperarEmail);
app.post("/validarcodigo", ResetController.validarCodigo);
app.post("/resetarsenha", ResetController.resetarSenha);
app.get("/rotateste", TesteController.testarBanco);
app.listen(port, () => {
   console.log("Servidor rodando na porta " + port);
});