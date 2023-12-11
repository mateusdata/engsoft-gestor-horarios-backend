const { query } = require("express");
const sequelize = require("../config/sequelize");
const Bsi = require("../models/Bsi");
const UserController = require("./UserController");
const Disciplinas = require("../models/Disciplinas");
const Usuario = require("../models/UserModel");

class ScheduleController{
    async mostrarHorario (req,res){
        //const {semestre} = req.body;
        const {semestre} = "quarto";

        const modalidade = "bacharelado_si";
        const horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        const materias = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"]
        try{
            const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from ${modalidade} where id='${semestre}'`);
            const usuarios = await sequelize.query(`select matricula, nome from usuarios`);
            const disciplinas = await sequelize.query(`select cod,nome from disciplinas`);
            for(var c=0; c<query[0].length; c++){
                for(var i=0; i<horarios.length; i++){
                    for(var j=0; j<usuarios[0].length; j++){
    
                        if(query[0][c][horarios[i]] == usuarios[0][j]["matricula"]){
                            query[0][c][horarios[i]] = usuarios[0][j]["nome"];
                        }
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

    async  showSchedules(req, res) {
        const { semestre } = req.query;
        const horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        const materias = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"];
    
        try {
            const query = await Bsi.findAll({
                where: {id: semestre ? semestre : "primeiro" }});
    
            const usuarios = await Usuario.findAll();
            const disciplinas = await Disciplinas.findAll();
    
            for (let c = 0; c < query.length; c++) {
                for (let i = 0; i < horarios.length; i++) {
                    for (let j = 0; j < usuarios.length; j++) {
                        if (query[c][horarios[i]] === usuarios[j].matricula) {
                            query[c][horarios[i]] = usuarios[j].nome;
                        }
                        if (query[c][materias[i]] === disciplinas[j].cod) {
                            query[c][materias[i]] = disciplinas[j].nome;
                        }
                    }
                }
            }
            res.send(query);
        } catch (error) {
            res.send("erro fatal");
        }
    }
    
}

module.exports = new ScheduleController();