import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import useLastMessage from "../../hooks/useLastMessage";


const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers}=useSocketContext();

  const isOnline=onlineUsers.includes(conversation._id);



  const { authUser } = useAuthContext();


  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
        onClick={async() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" :""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>

          {/* Last Message */}
          
          {/* <p>hiiiii</p> */}

        </div>
      </div>

      {/* <div className='divider my-0 py-0 h-1' /> */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
