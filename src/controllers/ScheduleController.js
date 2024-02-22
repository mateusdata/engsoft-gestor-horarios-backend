const { query } = require("express");
const sequelize = require("../config/sequelize");
const Bsi = require("../models/Bsi");
const UserController = require("./UserController");
const Disciplinas = require("../models/Disciplinas");
const Usuario = require("../models/UserModel");

class ScheduleController{
    async showSchedules(req,res){
        const { sem } = req.query;
        const schedules = ["prim_hor", "segu_hor", "terc_hor", "quar_hor", "quin_hor", "sext_hor"];
        const subjects = ["prim_hor_materia", "segu_hor_materia", "terc_hor_materia", "quar_hor_materia", "quin_hor_materia", "sext_hor_materia"];
        const arrayAll = ["dia","prim_hor","prim_hor_materia","dur_prim_hor","segu_hor","segu_hor_materia","dur_segu_hor","terc_hor","terc_hor_materia","dur_terc_hor","quar_hor","quar_hor_materia","dur_quar_hor","quin_hor","quin_hor_materia","dur_quin_hor","sext_hor","sext_hor_materia","dur_sext_hor"]

        try {
            const query = await Bsi.findAll(
                {where: {id: sem ? sem : "primeiro"},
                 attributes: arrayAll
            });
            const [users, disciplines] = await Promise.all([Usuario.findAll(),Disciplinas.findAll()]);

            const usersMap = new Map(users.map(users => [users.matricula, users.nome]));
            const disciplinesMap = new Map(disciplines.map(disciplines => [disciplines.cod, disciplines.nome]));

            for (let c = 0; c < query.length; c++) {
                const bsi = query[c];
            
                // Loop sobre os horários
                for (let i = 0; i < schedules.length; i++) {
                    const schedule = schedules[i];
            
                    // Substitui matrícula por nome do usuário, se aplicável
                    if (usersMap.has(bsi[schedule])) {
                        bsi[schedule] = usersMap.get(bsi[schedule]);
                    }
            
                    // Substitui código da disciplina por nome da disciplina, se aplicável
                    if (disciplinesMap.has(bsi[subjects[i]])) {
                        bsi[subjects[i]] = disciplinesMap.get(bsi[subjects[i]]);
                    }
                }
            }

            res.send(query);

        } catch{
            res.send("Erro de Retorno de Horários.");
        }
    }
    /*
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
                    }
                    for(let f=0; f < disciplinas.length; f++){
                        if (query[c][materias[i]] === disciplinas[f].cod) {
                            query[c][materias[i]] = disciplinas[f].nome;
                        }
                    }
                    
                }
            }
            
            res.send(query);
        } catch (error) {
            res.send("erro fatal");
        }
    }
*/
    async currentHourlyData(req,res){
        const {semestre} = req.query;
        try{
            const query = await sequelize.query(`select prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia from bacharelado_si where id='${semestre}'`);
            res.send(query[0]);
        }
        catch{
            res.send("Erro.");
        }
    }

    async updateSchedules(req,res){
        const {semestre} = req.query;
        const {prim_hor, prim_hor_materia, segu_hor, segu_hor_materia, terc_hor, terc_hor_materia, quar_hor, quar_hor_materia, quin_hor, quin_hor_materia, sext_hor, sext_hor_materia} = req.body;
        try{
            const query =  await sequelize.query(`UPDATE bacharelado_si SET prim_hor='${prim_hor}', prim_hor_materia='${prim_hor_materia}', segu_hor='${segu_hor}', segu_hor_materia='${segu_hor_materia}', terc_hor='${terc_hor}', terc_hor_materia='${terc_hor_materia}', quar_hor='${quar_hor}', quar_hor_materia='${quar_hor_materia}', quin_hor='${quin_hor}', quin_hor_materia='${quin_hor_materia}', sext_hor='${sext_hor}', sext_hor_materia='${sext_hor_materia}' where id='${semestre}'`);

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