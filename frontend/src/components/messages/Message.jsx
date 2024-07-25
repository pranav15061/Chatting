import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { BsCheck2All } from "react-icons/bs";
import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const {file, setFile} = useAuthContext()


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${bubbleBgColor}${shakeClass} pb-2`}
      >
        {/* {file && file.type.startsWith("image/") && (
                  <img src={message.message} alt="Uploaded" className="modal-image" />
                )} */}


        <a href={message.message}>
       {(message.message.startsWith("http://"))  && <img src={message.message} onError={(e) => {
        e.target.onerror = null; // Prevents infinite loop if fallback image fails
        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg";
      }} className="square-bordered-image" />}
        {message.message}
        </a>
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
