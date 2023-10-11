const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/auth");
const ApiRouter = require("./routes/api");
const port = process.env.PORT || 3001;

app.use("/a", AuthRouter);
app.use("/b", ApiRouter);

app.get("/", function (req, res) {
  res.send({projeto:"API do projeto de engenharia de software", rotas:""});
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
