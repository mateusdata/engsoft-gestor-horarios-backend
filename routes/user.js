const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

const authControler  = require("../controllers/authController")
const registerController  = require("../controllers/registerController")

router.post("/login", authControler.login); 
router.post("/cadastros", (registerController.register));


module.exports = router;
