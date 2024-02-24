import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 4,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);


userSchema.methods.generateToken = async function () {
    // console.log("I am token");
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error("Token Error: ", error);
    }
  };
const User = mongoose.model("User", userSchema);

export default User;