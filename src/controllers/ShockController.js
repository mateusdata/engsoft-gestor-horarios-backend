const { QueryError } = require("sequelize");
const UserModel = require("../models/UserModel");
const sequelize = require("../config/sequelize");
const Usuario = require("../models/UserModel");
const { Op } = require('sequelize');

class ShockController{
    async verify_shock(req,res){
        try{
            //todo
            console.log("todo");
        }
        catch(error){
            res.status(500).send({
                message: "Erro ao verificar choque"
            });
        }
    }
}

module.exports = new ShockController();