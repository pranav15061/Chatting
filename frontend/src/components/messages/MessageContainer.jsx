import React, { useEffect,useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import Icon from "./Icon";

import { Box, InputBase } from "@mui/material";
import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import styled from "@emotion/styled";
import { BsFillImageFill } from "react-icons/bs";



const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;


const MessageContainer = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();


  const [result, setResult] = useState("");

  useEffect(() => {
		// cleanup function (unmounts)
		 setSelectedConversation(null);
	}, [setSelectedConversation]);
 
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold"> {selectedConversation?.fullName}</span>
          </div>

          <Messages />
          {/* <Icon setResult={setResult} style={{ marginTop: '20px' }}/>   */}
          <MessageInput result={result} setResult={setResult} />
          {/* <MessageInput  /> */}

        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {

  const {authUser}=useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
