import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protectRoute = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;

    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const jwttoken = token.replace("Bearer ", "");
    // console.log("Token from Pranav",jwttoken);

    const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET);
    // console.log(decoded)

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
