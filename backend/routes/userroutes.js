import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSideBar } from "../controller/usercontroller.js";

const router = express.Router();


router.get("/",protectRoute, getUsersForSideBar);
// router.get("/", getUsersForSideBar);

export default router;
