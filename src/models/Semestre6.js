const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize");

class Semestre6 extends Model {}

Semestre6.init({
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    dia:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    disciplina:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    horario:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    professor:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    semestre:{
        type: DataTypes.STRING(255),
        allowNull: false
    }
},{
    sequelize,
    modelName: "Semestre6",
    tableName: "semestre6",
    timestamps: false
});

module.exports = Semestre6;
