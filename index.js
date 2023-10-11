const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/auth");
const ApiRouter = require("./routes/api");
//const port = process.env.PORT || 3001;

app.use("/", AuthRouter);
app.use("/", ApiRouter);

app.get("/", function (req, res) {
  res.send({projeto:"API do projeto de engenharia de software", rotas:""});
});

app.listen(3001, () => {
  console.log("Servidor rodando na 3001a " + 3001);
});
