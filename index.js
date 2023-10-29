const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const AuthRouter = require("./src/routes/auth");
const ApiRouter = require("./src/routes/api");
const sequelize = require("./src/config/sequelize");
const port = process.env.PORT || 3001;
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
app.use("/", AuthRouter);
app.use("/", ApiRouter);

app.get("/", function (req, res) {
  res.send({ projeto: "API de Engenharia de Software", rotas: [ "/auth/login", "/cadastro", "/teste", "/lista-usuarios", "/estalogado" ] });
});
app.post("/recuperaremail", async function(req, res){
  const {email} = req.body;
  const codigo = Math.floor(Math.random() *999999);
  try{
    let response = await sequelize.query(`SELECT email FROM recuperarsenha WHERE email='${email}'`);
    if(!response){
      res.send("Usuário não cadastrado");
    }
    else{
      res.send(response);
      sequelize.query(`UPDATE recuperarsenha SET codigo='${codigo}'`);
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
          to: "jpferreirafsa@gmail.com",
          from: "engsextosemestre@gmail.com",
          subject: "Código de Recuperação",
          text: codigo.toString(),
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>E-mail para Mateus</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
      
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background: #fff;
                      padding: 20px;
                      border-radius: 5px;
                      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  }
      
                  .header {
                      text-align: center;
                      background-color: #007BFF;
                      color: #fff;
                      padding: 20px 0;
                  }
      
                  h1 {
                      font-size: 24px;
                  }
      
                  .content {
                      padding: 20px;
                  }
      
                  p {
                      font-size: 16px;
                      line-height: 1.6;
                  }
      
                  .footer {
                      text-align: center;
                      background-color: #007BFF;
                      color: #fff;
                      padding: 10px 0;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>E-mail para Mateus, Programador TypeScript, Orelha Seca</h1>
                  </div>
                  <div class="content">
                      <p>Olá Mateus,</p>
                      <p>Espero que esta mensagem o encontre bem. Queremos reconhecer e agradecer pelo seu trabalho incrível como Programador TypeScript na equipe Orelha Seca.</p>
                      <p>Código de recuperação: ${codigo.toString()}</p>
                      <p>Continue com o excelente trabalho!</p>
                      <p>Atenciosamente,</p>
                      <p>Sua Equipe na Orelha Seca</p>
                  </div>
                  <div class="footer">
                      <p>Este é um e-mail de exemplo.</p>
                  </div>
              </div>
          </body>
          </html>
        `,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email enviado");
          })
          .catch((error) => {
            console.error("Erro ao enviar email ", error);
          });
      
    }
  }
  catch(error){
    res.send("Usuário não cadastrado");
  }
});
app.post("/verificarcodigo", async function(req, res){
  const {codigo, email} = req.body;
  try{
    const codigo_banco = await sequelize.query(`SELECT codigo FROM recuperarsenha WHERE email='${email}'`);
    if(codigo === codigo_banco[0][0].codigo){
      res.send("Validado!");
    }
    else{
      res.send("Inválido!");
    }
  }
  catch(error){
    console.log(error);
  }
})
app.post("/resetarsenha", async function(req, res){
  const {senha, email} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);
  const retorno = await sequelize.query(`UPDATE usuarios SET senha='${hash}' WHERE email ='${email}'`);
  if(retorno){
    res.send("sucesso");
  }
  else{
    res.send("Falha");
  }
}
)
app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
setInterval(() =>{
  console.log('Executando minha tarefa');
}, 25000);