const DB = require("../config/database");
function getUsers (req, res) {
    res.send("Voce pode acessar essa rota, e vc ta na rota de usuario");
};
function listItens (req, res) {

    let sql = `select * from disciplinas`
    DB.query(sql, (err, results) => {
      if (err) {
        console.error(err); 
        res.status(500).send({ error: "Ouve um erro no banco de dados." });
      }
      res.send(results);
  
    });
  }
module.exports = {getUsers, listItens};