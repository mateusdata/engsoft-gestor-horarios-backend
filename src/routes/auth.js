const { Router } = require("express");
const router = Router();

const AuthControler  = require("../controllers/AuthController")
const RegisterController  = require("../controllers/RegisterController");
const middlewareUser = require("../middleware/login");

router.post("/auth/login", AuthControler.login); 
router.post("/cadastro", RegisterController.register);
router.get("/estalogado",middlewareUser , AuthControler.isLogged);
module.exports = router;
