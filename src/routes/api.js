const { Router } = require("express");

const router = Router();

const middleareUser = require("../middleware/login");
const UserController  = require("../controllers/UserController")
router.get("/teste",middleareUser , UserController.getUsers);


module.exports = router;

