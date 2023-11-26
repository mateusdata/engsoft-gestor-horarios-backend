/**
 * @fileoverview Este arquivo define o modelo 'Usuario' para o Sequelize.
 * @requires sequelize
 * @requires dotenv
 */

/**
 * Importa o objeto Model e DataTypes do pacote 'sequelize'.
 * Importa o pacote 'dotenv' e carrega as variáveis de ambiente.
 * Importa a instância do Sequelize configurada anteriormente.
 */
const { Model, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = require("../config/sequelize")

/**
 * Define a classe 'Usuario' que estende a classe 'Model' do Sequelize.
 */
class Usuario extends Model {}

/**
 * Inicializa o modelo 'Usuario' com sua estrutura de campos.
 * @type {Model}
 * @const
 * @namespace Usuario
 * @property {object} fields - A estrutura de campos do modelo.
 * @property {object} options - Um objeto contendo opções de configuração.
 * @property {Sequelize} options.sequelize - A instância do Sequelize a ser vinculada.
 * @property {string} options.modelName - O nome do modelo.
 * @property {string} options.tableName - O nome da tabela no banco de dados.
 * @property {boolean} options.timestamps - Se o Sequelize deve lidar com a criação de timestamps.
 */
Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  administrador: {
    type: DataTypes.TINYINT(),
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING(20),
    defaultValue: null
  },
  departamento: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  cargo: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  token: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  expiracao_token: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  timestamps: false
});

/**
 * Exporta o modelo 'Usuario'.
 */
module.exports = Usuario;


