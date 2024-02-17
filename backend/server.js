import dotenv from "dotenv";
import express from "express";
import connect from "../backend/db/db.js";
import AuthRoutes from "./routes/routes.js";
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/", AuthRoutes);
app.use("/messages", messageRoutes);
app.use("/users",userRoutes);

connect();
app.listen(PORT, (req, res) => {
  console.log(`listening on Port: ${PORT}`);
});
