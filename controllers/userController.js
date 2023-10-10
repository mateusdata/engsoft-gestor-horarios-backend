import { query } from "../config/database";
function getUsers (req, res) {
    res.send("Voce pode acessar essa rota, e vc ta na rota de usuario");
};
function listItens (req, res) {
    
    let sql = `select * from disciplinas`
    query(sql, (err, results) => {
      if (err) {
        console.error(err); 
        res.status(500).send({ error: "Ouve um erro no banco de dados." });
      }
      res.send(results);
  
    });
  }
export default {getUsers, listItens};