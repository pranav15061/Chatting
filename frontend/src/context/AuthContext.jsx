import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};


export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null);

    const [file,setFile]=useState("");

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser,setFile,file }}>
      {children}
    </AuthContext.Provider>
  );
};
