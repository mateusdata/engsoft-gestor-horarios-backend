import { Router } from "express";
import jwt from 'jsonwebtoken';
const router = Router();

import { login, isLogged } from "../controllers/authController";
import { register } from "../controllers/registerController";
import middlewareUser from "../middleware/login";

router.post("/login", login); 
router.post("/cadastros", (register));
router.get("/estalogado",middlewareUser , isLogged);


export default router;
