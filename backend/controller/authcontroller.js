import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const Signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
       generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();

      res.status(201).json({
        // _id: newUser._id,
        // fullName: newUser.fullName,
        // username: newUser.username,
        // profilePic: newUser.profilePic,
        data: newUser,
      });
    } else {
      return res.status(201).json({ msg: "Invalid data" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server error" });
  }
};

export const Login = async(req, res) => {
//   res.send("Nallo");
    try
    {   
        const {username, password}=req.body;
        
        const exist=await User.findOne({username})
        if (!exist) {
            return res.status(404).json({ msg: "Username Does not exists" });
          }

          const compare=await bcrypt.compare(password,exist.password);

          if(!compare)
          {
            return res.status(400).json({ msg: "Incorrect Password" });
          }

          generateTokenAndSetCookie(exist._id,res); 
           res.status(200).json({data:exist});
        
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server error" });
    }


};

export const Logout = (req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
