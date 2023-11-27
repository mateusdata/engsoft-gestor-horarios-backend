/**
 * @module TeachersController
 * @requires sequelize
 * @requires ../config/sequelize
 */

const { QueryError } = require("sequelize");
const sequelize = require("../config/sequelize");

/**
 * @class
 * @classdesc TeachersController é uma classe que lida com solicitações relacionadas a professores.
 */
class TeachersController{
    /**
     * @async
     * @function show_teacher
     * @description Este método busca todos os usuários não administradores no banco de dados e os envia como resposta.
     * @param {Object} req - O objeto de solicitação.
     * @param {Object} res - O objeto de resposta.
     * @returns {void}
     */
    async show_teacher (req,res){
        const query = await sequelize.query("select * from usuarios where administrador=false");
        res.send(query);
    }
    /**
     * @async
     * @function dadosAtuaisProfessor
     * @description Este método busca os dados atuais de um professor com base em seu número de registro e os envia como resposta.
     * @param {Object} req - O objeto de solicitação.
     * @param {Object} res - O objeto de resposta.
     * @returns {void}
     */
    async dadosAtuaisProfessor (req, res){
        const {matricula} = req.params;
        try{
            const query = await sequelize.query(`select id, nome, matricula, departamento, cargo, email, administrador from usuarios where matricula = '${matricula}'`);
            console.log("deu certo");
            res.send("Atualizado");
        }
        catch{
            res.send("erro");
        }

    }
    /**
     * @async
     * @function atualizarProfessor
     * @description Este método atualiza os dados de um professor no banco de dados com base nos dados recebidos no corpo da solicitação.
     * @param {Object} req - O objeto de solicitação.
     * @param {Object} res - O objeto de resposta.
     * @returns {void}
     */
    async atualizarProfessor(req, res){
        const {matricula, nome, email, departamento, cargo, administrador} = req.body;
        try{
            const query = await sequelize.query(`UPDATE usuarios SET nome='${nome}', email='${email}', 
            departamento='${departamento}',cargo='${cargo}', administrador='${administrador}' WHERE matricula='${matricula}'`);
            res.send({mensage:"cadastro realizado com sucesso?!\n ",})
        }
        catch(error){  
        console.log(error); 

        res.send("ocoreu um erro")
        }

    }
}

module.exports = new TeachersController();
