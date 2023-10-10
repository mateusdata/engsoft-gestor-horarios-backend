import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(json());
app.use(cors());
import AuthRouter from "./routes/user";
import ApiRouter from "./routes/api";
const port = process.env.PORT || 3001;


app.use("/auth", AuthRouter);
app.use("/user", ApiRouter);

app.get("/", function (req, res) {
  res.send({name: "Api esta no computador local, tenha paciencia","Porta do servidor": port});
});
  
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
