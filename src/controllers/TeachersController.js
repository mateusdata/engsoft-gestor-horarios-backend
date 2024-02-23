const { QueryError } = require("sequelize");
const UserModel = require("../models/UserModel");
const sequelize = require("../config/sequelize");
const Usuario = require("../models/UserModel");
const { Op } = require('sequelize');
class TeachersController{
    async show_teacher (req,res){
        try {
            const usuarios = await Usuario.findAll();
            res.send(usuarios);
        } catch (error) {
            res.status(500).send({
                message: "Ocorreu um erro ao tentar recuperar os dados do professor."
            });
        }
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
    async seachTeacher(req, res) {
        console.log(req.query.nome);
        try {
            const users = await Usuario.findAll({
                where: {
                    nome: {
                        [Op.iLike]: `${req.query.nome}%`
                    }
                }
            });
    
            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno do servidor');
        }
    }
    

    
    async atualizarProfessor(req, res){
        const {matricula, nome, email, departamento, cargo, administrador} = req.body;
        try{
            const query = await sequelize.query(`UPDATE usuarios SET nome='${nome}', email='${email}', departamento='${departamento}',cargo='${cargo}', administrador='${administrador}' WHERE matricula='${matricula}'`);
           if(query){
            return  res.send("atualização realizada com sucesso?!");
           }
           return  res.send("Erro ao atualizar esse usuario");
        }
        catch(error){
           
            res.status(500).send({ error: error, mensage:"Ocorreu um erro."});
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
/*    
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
*/    
}

module.exports = new TeachersController();