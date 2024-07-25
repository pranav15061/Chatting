import User from "../models/usermodel.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    // const {name}=req.params;




    let  filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    // const filteredUsers = await User.find({})
    
    // if(name.length>0)
    // {
    //   const sclassRows =
    //    filteredUsers
    //   .filter((item) => {
    //     return name.toLowerCase() === ""
    //       ? item
    //       : item.fullName.toLowerCase().includes(name);
    //   })

      // console.log(sclassRows)

      // filteredUsers=sclassRows
      // return res.status(200).json({ filteredUsers });
    // }
    
      
    
    // console.log(filteredUsers);

    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log("Error in Get Userscontroller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
