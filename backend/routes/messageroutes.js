import express  from "express";
import { sendMessage ,getMessages} from "../controller/messagecontroller.js";
import  protectRoute  from "../middleware/protectRoute.js";


const router=express.Router();


router.get('/:id',protectRoute,getMessages);
router.post('/send/:id',protectRoute,sendMessage);

// router.get('/getlastMessage/:senderId/:receiverId',getlastMessage);


export default router;