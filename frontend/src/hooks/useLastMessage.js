import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useLastMessage = () => {
//   const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState();
  const { selectedConversation } = useConversation();

//   const token = localStorage.getItem("token");

  const getmsg = async (id1,id2) => {
    // setLoading(true);
    try {
        const res = await fetch(`http://localhost:5000/messages/getlastMessage/${id1}/${id2}`, {
            method: "GET",
            
          })
    

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
      
    } catch (error) {
      toast.error(error.message);
    } 
  };


  return { getmsg };
};
export default useLastMessage;
