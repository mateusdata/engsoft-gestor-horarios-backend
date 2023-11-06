/**
 * Módulo Router do Express.
 * @module express.Router
 */
const { Router } = require("express");

/**
 * Instância do Router.
 * @type {express.Router}
 */
const router = Router();

/**
 * Módulo middleareUser.
 * @module middleareUser
 */
const middleareUser = require("../middleware/login");

/**
 * Módulo UserController.
 * @module UserController
 */
const UserController  = require("../controllers/UserController")

/**
 * Rota GET para "/teste".
 * @name get/teste
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} callback - Express callback.
 */
router.get("/teste",middleareUser , UserController.getUsers);

/**
 * Exporta o router.
 * @module router
 */
module.exports = router;
