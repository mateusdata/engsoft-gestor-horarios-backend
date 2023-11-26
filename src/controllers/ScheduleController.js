const { query } = require("express");
const sequelize = require("../config/sequelize");

class ScheduleController{
    async mostrarHorario (req,res){
        //const {semestre} = req.body;
        const semestre = "prim_sem";
        const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from ${semestre}`);
        const tamanho = query[0].length;
        var horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        const usuarios = await sequelize.query("select matricula, nome from usuarios");
        for(var c=0; c<tamanho; c++){
            for(var i=0; i<horarios.length; i++){
                for(var j=0; j<usuarios[0].length; j++){
                    if(query[0][c][horarios[i]] == usuarios[0][j]["matricula"]){
                        query[0][c][horarios[i]] = usuarios[0][j]["nome"];
                    }
                }
            }

        }
        res.send(query[0]);
    }
}

module.exports = new ScheduleController();