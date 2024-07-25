import dotenv from "dotenv";
import express from "express";
import connect from "../backend/db/db.js";
import AuthRoutes from "./routes/routes.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./socket/socket.js";
import path from "path";

dotenv.config();
// const app = express();

const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

const corsOptions = {
  origin: 'http://localhost:3000', // Change this to the origin of your React app
  credential:true,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));


app.use("/", AuthRoutes);
app.use("/messages", messageRoutes);
app.use("/users",userRoutes);

// app.use(express.static(path.join(__dirname,"/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.get('/',(req,res)=>{
    res.status(200).json({msg:"HII"});
})

connect();
server.listen(PORT, (req, res) => {
  console.log(`listening on Port: ${PORT}`);
});
