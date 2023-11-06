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
 * Módulo AuthControler.
 * @module AuthControler
 */
const AuthControler  = require("../controllers/AuthController")

/**
 * Módulo RegisterController.
 * @module RegisterController
 */
const RegisterController  = require("../controllers/RegisterController");

/**
 * Módulo middlewareUser.
 * @module middlewareUser
 */
const middlewareUser = require("../middleware/login");

/**
 * Rota POST para "/auth/login".
 * @name post/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback.
 */
router.post("/auth/login", AuthControler.login); 

/**
 * Rota POST para "/cadastro".
 * @name post/cadastro
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} callback - Express callback.
 */
router.post("/cadastro", RegisterController.register);

/**
 * Rota GET para "/estalogado".
 * @name get/estalogado
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @param {callback} callback - Express callback.
 */
router.get("/estalogado",middlewareUser , AuthControler.isLogged);

/**
 * Exporta o router.
 * @module router
 */
module.exports = router;
