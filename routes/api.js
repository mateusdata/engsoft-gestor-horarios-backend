const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

const middleareUser = require("../middleware/login");
const authControler  = require("../controllers/userController")
//router.use(middleareUser);
router.get("/teste",middleareUser , authControler.getUsers);
router.get("/lista" , authControler.listItens);







module.exports = router;
