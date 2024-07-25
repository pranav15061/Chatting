import express  from "express";
import {Login,Signup,Logout} from "../controller/authcontroller.js";

// Files
import upload from "../utils/upload.js"
import {uploadimg,downloadimg} from "../controller/imagecontroller.js"

const router=express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

// Files 
router.post("/upload",upload.single('file'),uploadimg);
router.get("/file/:fileId",downloadimg)
export default router;