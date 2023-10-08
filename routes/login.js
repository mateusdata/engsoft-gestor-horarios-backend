const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();
const authControler  = require("../controllers/authController")
//aqui é um grupo de rotas
router.post("/login", authControler.login); 
router.get("/users", authControler.login);

module.exports = router;
