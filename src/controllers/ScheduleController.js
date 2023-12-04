const { query } = require("express");
const sequelize = require("../config/sequelize");

class ScheduleController{
    async mostrarHorario (req,res){
        //const {semestre} = req.body;
        const semestre = "primeiro";
        const modalidade = "bacharelado_si";
        const horarios = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        const materias = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"]
        try{
            const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from ${modalidade} where id='${semestre}'`);
            res.send(query[0]);
        }
        catch{
            res.send("erro fatal");
        }

    }
}

module.exports = new ScheduleController();