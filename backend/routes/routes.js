import express  from "express";
import {Login,Signup,Logout} from "../controller/authcontroller.js";

const router=express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

export default router;