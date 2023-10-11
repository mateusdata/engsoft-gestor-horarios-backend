const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const authControler  = require("../controllers/authController")
const Register  = require("../controllers/registerController");
const middlewareUser = require("../middleware/login");

router.post("/login", authControler.login); 
router.post("/cadastros", Register.register);
router.get("/estalogado",middlewareUser , authControler.isLogged);


module.exports = router;
