const { Router } = require("express");
const jwt = require("jsonwebtoken");
const chaveSecreta = "mateus";

const router = Router();
const DB = require("../config/database");

const middleareUser = require("../middleware/login");
const authControler  = require("../controllers/userController")


//router.use(middleareUser);
router.get("/teste",middleareUser , authControler.getUsers);

module.exports = router;
