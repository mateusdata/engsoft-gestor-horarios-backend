const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const sequelize = require("../config/sequelize");

class ResetController {
    async recuperarEmail(req, res){
        const {email} = req.body;
        const codigo = Math.floor(Math.random() *999999);
        try{
          let response = await sequelize.query(`SELECT email FROM recuperarsenha WHERE email='${email}'`);
          if(!response[0][0]){
            res.send("Usuário não cadastrado");
          }
          else{
            res.send(response);
            sequelize.query(`UPDATE recuperarsenha SET codigo='${codigo}' WHERE email='${email}'`);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
            const msg = {
                to: email,
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
                            <h1>Email de recuperação</h1>
                        </div>
                        <div class="content">
                            <p>Olá, este email automático destina-se a recuperação de senha</p>
                            <p>Seu código de recuperação: ${codigo.toString()}</p>
                            <p>Insira este código no campo de recuperação para redefinir sua senha.</p>
                            <p>Atenciosamente,</p>
                            <p>Gestor de Horários IFBA</p>
                        </div>
                    </div>
                </body>
                </html>
              `,
              };
              console.log('3')
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
          res.send(error);
        }
      }
    
      async validarCodigo(req, res){
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
      }
      async resetarSenha(req, res){
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
}

module.exports = new ResetController();