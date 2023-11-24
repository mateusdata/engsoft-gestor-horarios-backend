const sequelize = require("../config/sequelize");

class TeachersController{
    async show_teacher (req,res){
        const query = await sequelize.query("select * from usuarios where administrador=false");
        res.send(query);
    }
}

module.exports = new TeachersController();