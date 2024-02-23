const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize");

class Semestre2 extends Model {}

Semestre2.init({
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
    modelName: "Semestre2",
    tableName: "semestre2",
    timestamps: false
});

module.exports = Semestre2;
