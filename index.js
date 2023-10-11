const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
//const AuthRouter = require("./routes/auth");
//const ApiRouter = require("./routes/api");
const port = process.env.PORT || 3001;

//app.use("/a", AuthRouter);
//app.use("/b", ApiRouter);

app.get("/s", function (req, res) {
  res.send({projeto:"API do projeto de engenharia de software", rotas:""});
});
const UserModel = require('./models/UserModel');

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Houve um erro no banco de dados." });
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
