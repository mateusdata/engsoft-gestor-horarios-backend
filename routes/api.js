const { Router } = require("express");
const UserModel = require('../models/UserModel');

const router = Router();

const middleareUser = require("../middleware/login");
const UserController  = require("../controllers/UserController")
//router.use(middleareUser);
router.get("/teste",middleareUser , UserController.getUsers);
router.post("/lista-usuarios", async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Houve um erro no banco de dados." });
    }
  });
module.exports = router;
