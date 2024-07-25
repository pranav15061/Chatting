import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  const converse = conversations.filteredUsers;

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {converse?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === converse.length - 1}
        />
      ))}

      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>

    
  );
};

export default Conversations;
