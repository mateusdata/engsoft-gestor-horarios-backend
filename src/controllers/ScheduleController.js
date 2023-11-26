const { query } = require("express");
const sequelize = require("../config/sequelize");

class ScheduleController{
    async mostrarHorario (req,res){
        //const {semestre} = req.body;
        const semestre = "prim_sem";
        const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from ${semestre}`);
        var horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        var materias = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"]
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
}

module.exports = new ScheduleController();