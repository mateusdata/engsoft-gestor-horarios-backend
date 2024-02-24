const { query } = require("express");
const sequelize = require("../config/sequelize");
const Bsi = require("../models/Bsi");
const UserController = require("./UserController");
const Disciplinas = require("../models/Disciplinas");
const Usuario = require("../models/UserModel");

class ScheduleController{
    async createSchedules(req,res){
        try {
            const {dia, professor, disciplina, horario, semestre} = req.body;
            console.log(req.body);
            await sequelize.query(`INSERT INTO public.semestre${parseInt(semestre)}(dia, professor, disciplina, horario, semestre) VALUES (?, ?, ?, ?, ?)`, 
            { replacements: [dia, professor, disciplina, horario, semestre], type: sequelize.QueryTypes.INSERT });
    
            res.status(200).json({ message: 'Dados criados com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Houve um erro ao criar os dados.', error: error.toString() });
        }
    }

    async searchSchedules(req, res) {
        try {
            const { semestre } = req.params;
            console.log(semestre);
            const dataFromDB = await sequelize.query(`SELECT * FROM public.semestre${parseInt(semestre)}`, { replacements: [semestre], type: sequelize.QueryTypes.SELECT });
    
            // Reestruturando os dados
            const formattedData = {};
            dataFromDB.forEach(schedule => {
                if (!formattedData[schedule.dia]) {
                    formattedData[schedule.dia] = {
                        dia: schedule.dia,
                        aulas: []
                    };
                }
                formattedData[schedule.dia].aulas.push({
                    name: schedule.professor,
                    disciplina: schedule.disciplina,
                    horario: schedule.horario
                });
            });
    
            // Convertendo o objeto em um array
            const dataArray = Object.values(formattedData);
    
            res.send(dataArray);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Houve um erro ao criar os dados.', error: error.toString() });
        }
    }
    async showAllSchedules(req, res) {
        try {
            const semestres = [];
            
            for (let i = 1; i <= 8; i++) {
                const semestre = `Semestre${i}`;
                const schedules = await sequelize.query(
                    `SELECT * FROM public.${semestre}`,
                    { type: sequelize.QueryTypes.SELECT }
                );
    
                // Reestruturando os dados
                const formattedData = {};
                schedules.forEach((schedule) => {
                    if (!formattedData[schedule.dia]) {
                        formattedData[schedule.dia] = {
                            dia: schedule.dia,
                            aulas: [],
                        };
                    }
                    formattedData[schedule.dia].aulas.push({
                        name: schedule.professor,
                        disciplina: schedule.disciplina,
                        horario: schedule.horario,
                    });
                });
    
                // Convertendo o objeto em um array
                const dataArray = Object.values(formattedData);
    
                // Adicionando os dados ao array de semestres
                semestres.push({
                    [semestre]: dataArray
                });
            }
    
            res.send(semestres);
        } catch (error) {
            // Trate o erro de alguma forma, como enviar uma mensagem de erro para o cliente
            res.status(500).send('Erro ao buscar os horários dos semestres');
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