/**
 * @module ScheduleController
 * @requires express
 * @requires ../config/sequelize
 */

const { query } = require("express");
const sequelize = require("../config/sequelize");

/**
 * @class
 * @classdesc ScheduleController é uma classe que lida com solicitações relacionadas a horários.
 */
class ScheduleController{
    /**
     * @async
     * @function mostrarHorario
     * @description Este método busca o horário de um determinado semestre no banco de dados e o envia como resposta.
     * @param {Object} req - O objeto de solicitação.
     * @param {Object} res - O objeto de resposta.
     * @returns {void}
     */
    async mostrarHorario (req,res){
        const semestre = "prim_sem";
        var horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        var materias = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"]
        try{
            const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from ${semestre}`);
            const usuarios = await sequelize.query(`select matricula, nome from usuarios`);
            const disciplinas = await sequelize.query(`select cod,nome from disciplinas`);
            for(var c=0; c<query[0].length; c++){
                for(var i=0; i<horarios.length; i++){
                    for(var j=0; j<usuarios[0].length; j++){
                        if(query[0][c][horarios[i]] == usuarios[0][j]["matricula"]){
                            query[0][c][horarios[i]] = usuarios[0][j]["nome"];
                        }
                    }
                }
                for(var i=0; i<materias.length; i++){
                    for(var j=0; j<disciplinas[0].length; j++){
                        if(query[0][c][materias[i]] == disciplinas[0][j]["cod"]){
                            query[0][c][materias[i]] = disciplinas[0][j]["nome"];
                        }
                    }
                }
            }
            res.send(query[0]);
        }
        catch{
            res.send("erro fatal");
        }
    }
}

module.exports = new ScheduleController();
