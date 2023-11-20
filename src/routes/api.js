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
//router.use(middleareUser);
router.get("/teste",middleareUser , UserController.getUsers);
router.get("/lista-usuarios", async (req, res) => {
  try {
    const users = await UserModel.findAll();

    const repeatedUsers = [];
    for (let i = 0; i < 200; i++) {
      repeatedUsers.push(...users);
    }

    res.send(repeatedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Houve um erro no banco de dados." });
  }
});

module.exports = router;

