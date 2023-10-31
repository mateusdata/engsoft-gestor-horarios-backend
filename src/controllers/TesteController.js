const sequelize = require("../config/sequelize");
class TesteController {

    async testarBanco(req, res){
        try{
            let professores = await sequelize.query("SELECT nome FROM usuarios");
            res.send(professores);
        }
        catch{
            res.send("erro");
        }
    }
}
module.exports = new TesteController();