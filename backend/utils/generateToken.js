import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign( {userId} , process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, 
		
	});

	return token;
	// try {
	// 	return jwt.sign(
	// 	  {
	// 		userId
	// 	  },
	// 	  process.env.JWT_SECRET,
	// 	  {
	// 		expiresIn: "30d",
	// 	  }
	// 	);
	//   } catch (error) {
	// 	console.error("Token Error: ", error);
	//   }
};

export default generateTokenAndSetCookie;