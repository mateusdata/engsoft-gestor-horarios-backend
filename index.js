const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/user");
const ApiRouter = require("./routes/api");


app.use("/auth", AuthRouter);
app.use("/user", ApiRouter);

app.get("/", function (req, res) {
  res.send({name: "Projeto de engenharia do sofware"});
});
  
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
