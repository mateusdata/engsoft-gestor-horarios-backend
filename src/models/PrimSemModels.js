const { Model, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require("../config/sequelize");

class PrimSem extends Model {}

PrimSem.init({
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    prim_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    prim_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    segu_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    segu_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    terc_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    terc_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    quar_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    quar_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    quin_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    quin_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    sext_hor:{
        type: DataTypes.STRING(11),
        allownull: false
    },
    sext_hor_materia:{
        type: DataTypes.STRING(11),
        allownull: false
    }  
},{
    sequelize,
    modelName: "Pri",
    tableName: "PriSem",
    timestamps: false
});

module.exports = PrimSem;