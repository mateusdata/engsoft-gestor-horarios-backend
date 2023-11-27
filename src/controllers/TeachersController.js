const { QueryError } = require("sequelize");
const UserModel = require("../models/UserModel");
const sequelize = require("../config/sequelize");

class TeachersController{
    async show_teacher (req,res){
        const query = await sequelize.query("select id, nome, matricula, departamento, cargo, email, administrador from usuarios");
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
            const query = await sequelize.query(`UPDATE usuarios SET nome='${nome}', email='${email}', departamento='${departamento}',cargo='${cargo}' WHERE matricula='${matricula}'`);
            res.send("cadastro realizado com sucesso?!");
        }
        catch(error){ 
            res.send(error);
        }

    }

    async deleteTeacher(req, res){
        const { id } = req.params;
        try {
            const user = await UserModel.destroy({
                where: { id },
              });
            if(user > 0){
                res.send("Sucess");
            } else{
                res.status(500).send("Error");
            }
        } catch (error) {
            res.status(500).send("Error");
        }
        
    }
}

module.exports = new TeachersController();