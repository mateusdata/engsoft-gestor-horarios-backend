const { query } = require("express");
const sequelize = require("../config/sequelize");
const Bsi = require("../models/Bsi");
const UserController = require("./UserController");
const Disciplinas = require("../models/Disciplinas");
const Usuario = require("../models/UserModel");

class ScheduleController{
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