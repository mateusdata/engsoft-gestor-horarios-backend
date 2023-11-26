const { QueryError } = require("sequelize");
const sequelize = require("../config/sequelize");

class TeachersController{
    async show_teacher (req,res){
        const query = await sequelize.query("select * from usuarios where administrador=false");
        res.send(query);
    }
    async dadosAtuaisProfessor (req, res){
        const {matricula} = req.params;
        try{
            const query = await sequelize.query(`select id, nome, matricula, departamento, cargo, email, administrador from usuarios where matricula = '${matricula}'`);
            res.send(query[0]);
        }
        catch{
            res.send("erro");
        }

    }
    async atualizarProfessor(req, res){
        const {matricula, nome, email, departamento, cargo, administrador} = req.body;
        try{
            const query = await sequelize.query(`UPDATE usuarios SET nome='${nome}', email='${email}, departamento='${departamento}',cargo='${cargo}', administrador='${administrador}' WHERE matricula='${matricula}'`);
            res.send("cadastro realizado com sucesso?!");
        }
        catch(error){
            res.send({mensage:"Ocorreu um erro com o base da dados",error:error});
        }

    }
}

module.exports = new TeachersController();