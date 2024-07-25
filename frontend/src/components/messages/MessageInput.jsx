import { BsFillImageFill, BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useEffect, useState } from "react";
import { AttachFile } from "@mui/icons-material";
import styled from "@emotion/styled";
import Icon from "./Icon";
import Lottie from "react-lottie"

import animationData from "../../animations/typing.json";

import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const MessageInput = ({ result, setResult }) => {


	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
		  preserveAspectRatio: "xMidYMid slice",
		},
	  };

  const { selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const [typing, setTyping] = useState(false);
  const [istyping, setisTyping] = useState(false);

  // const [file, setFile]=useState("");

 const {setFile} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (result) {
      await sendMessage(result);
    } else {
		let c=message;
		if (!c || !(c = c.trimStart())) return;
      await sendMessage(message);
    }
    setMessage("");
    setResult("");
    setFile("")

    socket.emit("stop-typing", selectedConversation._id);
  };

  useEffect(() => {
    socket.on("istyping", () => setisTyping(true));
    socket.on("stop", () => setisTyping(false));
  }, []);

  const handlechange = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedConversation._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedConversation._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      {/* <Icon/> */}
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          {istyping && <div>
			<Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
			
			</div>}
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            value={result ? result : message}
            onChange={handlechange}
          />

          <div>
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <BsSend />
              )}
              <Icon setResult={setResult}  style={{ marginTop: "20px" }} />

            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default MessageInput;
