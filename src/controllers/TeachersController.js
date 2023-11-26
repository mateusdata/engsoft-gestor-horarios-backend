const { QueryError } = require("sequelize");
const sequelize = require("../config/sequelize");

class TeachersController{
    async show_teacher (req,res){
        const query = await sequelize.query("select * from usuarios where administrador=false");
        res.send(query);
    }
    async dadosAtuaisProfessor (req, res){
        const {matricula} = req.body;
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
            res.send(query[0]);
        }
        catch{
            res.send("erro");
        }

    }
}

module.exports = new TeachersController();