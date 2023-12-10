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

    async currentHourlyData(req,res){
        try{
            const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from bacharelado_si where id=primeiro`);
            res.send(query[0]);
        }
        catch{
            res.send("Erro.");
        }
    }

    async updateSchedules(req,res){
        const {prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia} = req.body;

        try{
            const query =  await sequelize.query(`UPDATE bacharelado_si SET prim_hor='${prim_hor}', prim_hor_materia='${prim_hor_materia}', segu_hor='${segu_hor}', segu_hor_materia='${segu_hor_materia}', terc_hor='${terc_hor}', terc_hor_materia='${terc_hor_materia}', quar_hor='${quar_hor}', quar_hor_materia='${quar_hor_materia}', quin_hor='${quin_hor}', quin_hor_materia='${quin_hor_materia}', sext_hor='${sext_hor}', sext_hor_materia='${sext_hor_materia}' where id=primeiro`);
            
            if(query){
                return  res.send("Dados Atualizados com Sucesso !");
               }
               return  res.send("Erro ao Atualizar o Horário.");
            }
            catch(error){
                res.status(500).send({ error: error, mensage:"Erro 500."});
            }
    }
}

module.exports = new ScheduleController();