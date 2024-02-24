import dotenv from "dotenv";
import express from "express";
import connect from "../backend/db/db.js";
import AuthRoutes from "./routes/routes.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app,server} from "./socket/socket.js";


dotenv.config();
// const app = express();

const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: 'http://localhost:3000', // Change this to the origin of your React app
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/", AuthRoutes);
app.use("/messages", messageRoutes);
app.use("/users",userRoutes);

connect();
server.listen(PORT, (req, res) => {
  console.log(`listening on Port: ${PORT}`);
});
