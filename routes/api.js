import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

import middleareUser from "../middleware/login";
import authControler from "../controllers/userController";
//router.use(middleareUser);
router.get("/teste",middleareUser , authControler.getUsers);
router.get("/lista" , authControler.listItens);







export default router;
