const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize");

class Semestre1 extends Model {}

Semestre1.init({
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
    modelName: "Semestre1",
    tableName: "semestre1",
    timestamps: false
});

module.exports = Semestre1;
