import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";

// import generateTokenAndSetCookie from "../utils/generateToken.js";

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

    let token;
    if (newUser) {
      //  generateTokenAndSetCookie(newUser._id,res);

      await newUser.save();
       token=await newUser.generateToken();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        // data: newUser,
      });
    } 
    else {
      return res.status(201).json({ error: "Invalid data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const Login = async(req, res) => {
//   res.send("Nallo");
    try
    {   
        const {username, password}=req.body;
        
        const exist=await User.findOne({username})
        if (!exist) {
            return res.status(404).json({ error: "Username Does not exists" });
          }

          const hashedPassword=await bcrypt.compare(password,exist.password);

          if(!hashedPassword)
          {
            return res.status(400).json({ error: "Incorrect Credentials" });
          }

          // const token=generateTokenAndSetCookie(exist._id,res); 

          const token=await exist.generateToken();
          // console.log(token);
          // const token = await exist.generatetoken()
          //  res.status(200).json({data:exist});

          // console.log(token);
          res.cookie("jwt", token, {
            httpOnly: true, 
            expires:new Date(Date.now()+25892000000)
          });

          res.status(200).json({
            _id: exist._id,
            fullName: exist.fullName,
            username: exist.username,
            profilePic: exist.profilePic,
            token
          });
        
    }
    catch(error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server error" });
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
