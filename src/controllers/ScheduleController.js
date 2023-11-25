const sequelize = require("../config/sequelize");

class ScheduleController{
    async mostrarHorario (req,res){
        const {semestre} = req.body;
        const query = await sequelize.query(`select * from ${semestre}`);
        res.send(query[0]);
    }
}

module.exports = new ScheduleController();