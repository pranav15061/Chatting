import User from "../models/usermodel.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in Get Userscontroller", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
