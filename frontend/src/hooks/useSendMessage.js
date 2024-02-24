import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

    const token=localStorage.getItem("token")

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`http://localhost:5000/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
				},
                body: JSON.stringify({ message} ),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
            console.log(data);

			setMessages([...messages, data]);
            
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;