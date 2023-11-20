const sequelize = require("../config/sequelize");

class SchedulesController{
    async show_teacher (req,res){
        const query = await sequelize.query("select * from usuarios where administrador=false");
        res.send(query);
    }
}

module.exports = new SchedulesController();