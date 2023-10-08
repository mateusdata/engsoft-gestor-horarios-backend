const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/login");
const UserRouter = require("./routes/user");


app.use("/api", AuthRouter);
app.use("/user", UserRouter);

app.get("/", function (req, res) {
  res.send({
    name: "Projeto de engenharia do sofware",
    version: "6° semestre",
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
