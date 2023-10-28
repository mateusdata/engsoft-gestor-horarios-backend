const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./src/routes/auth");
const ApiRouter = require("./src/routes/api");
const sequelize = require("./src/config/sequelize");
const port = process.env.PORT || 3001;

app.use("/", AuthRouter);
app.use("/", ApiRouter);

app.get("/", function (req, res) {
  res.send({ projeto: "API de Engenharia de Software", rotas: [ "/auth/login", "/cadastro", "/teste", "/lista-usuarios", "/estalogado" ] });
});
app.get("/recuperaremail", async function(req, res){
  var email = "leroy@ifba.edu.br";
  const codigo = Math.floor(Math.random() *999999);
  try{
    let response = await sequelize.query(`SELECT email FROM recuperarsenha WHERE email='${email}'`);
    if(!response){
      res.send("Usuário não cadastrado");
    }
    else{
      res.send(response);
      sequelize.query(`UPDATE recuperarsenha SET codigo='${codigo}'`);
      
    }
  }
  catch(error){
    res.send("Usuário não cadastrado");
  }
});
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
setInterval(() =>{
  console.log('Executando minha tarefa');
}, 25000);