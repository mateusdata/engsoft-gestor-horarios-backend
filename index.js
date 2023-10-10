const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./routes/user");
const ApiRouter = require("./routes/api");
const DB = require("./config/database");
const port = process.env.PORT || 3001;


app.use("/auth", AuthRouter);
app.use("/user", ApiRouter);

app.get("/", function (req, res) {
  res.send({name: "Api esta no computador local, tenha paciencia","Porta do servidor": port});
});
  
app.listen(-50, () => {
  console.log("Servidor rodando na porta " + port);
});
