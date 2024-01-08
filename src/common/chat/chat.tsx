/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { url } from "@/routes";
import { fetchClientDetails } from "@/redux/dashboard/fetchApiData/fetchApiDataSlice";
import { useAppDispatch } from "@/redux/store";
import { baseImgUrl } from "@/routes";
import { IoSendSharp } from "react-icons/io5";
import { format } from "timeago.js";
import { useRef } from "react";
import { connectSocket } from "../global/socket";
import { Socket } from "socket.io-client";

import "./chat.css";

import axios from "axios";

interface ChatProp {
  newMessageAppeared: boolean;
  setNewMessageAppeared: Dispatch<SetStateAction<boolean>>;
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
}

const Chat = (prop: ChatProp) => {
  const [userChatted, setUserChatted] = useState<any>([]);
  const [indvChat, setIndvChat] = useState<any>([]);
  const [sock, setSocket] = useState<Socket>();

  const [audio] = useState(new Audio("/audio/chatAayo.mp3"));
  const [message, setMessage] = useState<any>();
  const [recievedMessages, setRecievedMessages] = useState<Array<any>>([]);

  useEffect(() => {
    console.log(message);
  }, [message]);

  const dispatch = useAppDispatch();

  const { clientDetails } = useAppSelector(
    (state: RootState) => state.fetchDashData
  );

  const { userToken } = useAppSelector((state: RootState) => state.signin);
  const scroll: any = useRef();

  const playAudioAndShow = async () => {
    console.log("I am called");
    prop.setNewMessageAppeared(true);
    await audio.play();
  };
  useEffect(() => {
    setSocket(connectSocket(userToken));
  }, [setSocket, connectSocket]);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    sock &&
      sock.on("CHATTING", (arg) => {
        console.log(arg);
        if (prop.currentUser) {
          if (prop.currentUser.members[0]) {
            if (arg.senderId === prop.currentUser.members[0]._id) {
              console.log("Here I am - Sender");
              const body = {
                content: arg.message,
                senderId: arg.senderId,
              };
              setIndvChat((prevMessages: any) => [...prevMessages, body]);
            } else {
              console.log("Here I am - Receiver");
              playAudioAndShow();
              setRecievedMessages((prevMessages: any) => [
                ...prevMessages,
                arg.senderId,
              ]);
            }
          } else {
            console.log("Here I am - No Members");
            playAudioAndShow();
            setRecievedMessages((prevMessages: any) => [
              ...prevMessages,
              arg.senderId,
            ]);
          }
        } else {
          console.log("Here I am - No Current User");
          playAudioAndShow();
          setRecievedMessages((prevMessages: any) => [
            ...prevMessages,
            arg.senderId,
          ]);
        }
      });
  }, [prop.currentUser, sock]);

  useEffect(() => {
    recievedMessages.length === 0 && prop.setNewMessageAppeared(false);
  }, [recievedMessages]);

  useEffect(() => {
    const getUserChatData = async (id: string | null) => {
      try {
        const res = await axios.get(`${url}/chat/${id}`);
        setUserChatted(res.data.Data);
      } catch (err) {
        console.log(err);
        const customError = new Error(
          "An error occurred: " + (err as Error).message
        ) as Error;
        throw customError;
      }
    };
    if (clientDetails && clientDetails._id) getUserChatData(clientDetails._id);
  }, [clientDetails]);

  useEffect(() => {
    const fetchIndvChat = async (chatId: string | null) => {
      try {
        const res = await axios.get(`${url}/message/${chatId}`);
        setIndvChat(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        const customError = new Error(
          "An error occurred: " + (err as Error).message
        ) as Error;
        throw customError;
      }
    };

    if (prop.currentUser) fetchIndvChat(prop.currentUser.chatId);
  }, [prop.currentUser]);

  useEffect(() => {
    dispatch(fetchClientDetails(userToken));
  }, [dispatch, userToken]);

  const sendMessage = async () => {
    if (clientDetails && clientDetails._id) {
      const messageBody = {
        receiveId: prop.currentUser.members[0]._id,
        message: message,
        senderId: clientDetails._id,
      };

      sock && sock.emit("CHATTING", messageBody);
      setMessage(" ");
      const body = {
        chatId: prop.currentUser.chatId,
        senderId: clientDetails._id,
        content: message,
      };
      try {
        await axios.post(`${url}/message`, body);
      } catch (err) {
        console.log(err);
      }
    }

    setIndvChat([
      ...indvChat,
      {
        chatId: prop.currentUser.chatId,
        content: message,
        senderId: clientDetails._id,
      },
    ]);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [indvChat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  useEffect(() => {
    console.log(recievedMessages);
    if (recievedMessages.length === 0) prop.setNewMessageAppeared(false);
  }, [recievedMessages]);

  return (
    <>
      <div className="bg-white md:h-[500px] md:w-[600px] h-[500px] w-[370px] relative">
        <div className="Chat ">
          <div className="Left-side-chat bg-[rgb(70,70,70)] text-white">
            <div className="Chat-container">
              <h1 className="text-[20px] font-bold text-center"> Chats </h1>
              <div className="Chat-list">
                {userChatted.length > 0 &&
                  userChatted.map((ru: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (recievedMessages.includes(ru.members[0]._id)) {
                          const data = [...recievedMessages];
                          const filteredData = data.filter(
                            (content) => content !== ru.members[0]._id
                          );
                          console.log(filteredData);
                          setRecievedMessages(filteredData);
                        }
                        prop.setCurrentUser(ru);
                      }}
                    >
                      <div className="follower conversation" key={i}>
                        {ru.members[0] && (
                          <div className="flex gap-3 relative items-center ">
                            {ru.members[0].restaurant.mainImage ? (
                              <img
                                loading="lazy"
                                src={`${baseImgUrl}/${ru.members[0].restaurant.mainImage}`}
                                className="followerImage h-[30px] w-[30px] rounded-full"
                              />
                            ) : (
                              <img
                                loading="lazy"
                                src="/img/defaultIcon.jpg"
                                className="followerImage h-[50px] w-[50px] rounded-full"
                              />
                            )}
                            {prop.newMessageAppeared &&
                              recievedMessages.includes(ru.members[0]._id) && (
                                <div className="absolute top-0 h-[15px] w-[15px] rounded-full bg-[#e01f2d]" />
                              )}

                            <div className="name" style={{ fontSize: ".8rem" }}>
                              <span className="font-bold">
                                {" "}
                                {ru.members[0].restaurant.name}{" "}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <hr
                        className="w-[85%]"
                        style={{ border: "0.1px solid #ececec" }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="Right-side-chat">
            <div className="ChatBox-container h-[500px] relative">
              {prop.currentUser ? (
                <>
                  <div className="chat-header pb-0">
                    <div className="follower">
                      {prop.currentUser && (
                        <div className="flex gap-3 items-center">
                          {prop.currentUser.members[0].restaurant.mainImage ? (
                            <img
                              loading="lazy"
                              src={`${baseImgUrl}/${prop.currentUser.members[0].restaurant.mainImage}`}
                              className="followerImage h-[30px] w-[30px] rounded-full"
                            />
                          ) : (
                            <img
                              loading="lazy"
                              src="/img/defaultIcon.jpg"
                              className="followerImage h-[50px] w-[50px] rounded-full"
                            />
                          )}
                          <div className="name" style={{ fontSize: "0.8rem" }}>
                            <span className="text-[20px] font-bold">
                              {" "}
                              {prop.currentUser.members[0].restaurant.name}{" "}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <hr
                      className="mt-5"
                      style={{ border: "0.1px solid #ececec" }}
                    />
                  </div>
                  <div className="chat-body pt-[0px] h-[360px] mt-[-50px] bg-white overflow-scroll text-[15px]">
                    {indvChat.map((chat: any, id: number) => (
                      <div
                        ref={scroll}
                        key={id}
                        className={`${
                          chat.senderId === clientDetails._id
                            ? "message own"
                            : "message other"
                        } rounded-[10px] ml-5 mt-5`}
                      >
                        <span> {chat.content} </span>
                        <span> {format(chat.createdAt)} </span>
                      </div>
                    ))}
                  </div>
                  <div className="chat-sender rounded-none absolute bottom-0 left-0 right-0">
                    <textarea
                      className="w-full border-2 border-[rgb(230,230,230)] resize-none pl-[15px]"
                      value={message}
                      placeholder="Enter your text"
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <IoSendSharp
                      size={30}
                      className="absolute top-[15px] text-[rgb(70,70,70)] right-[10px] cursor-pointer"
                      onClick={sendMessage}
                    />
                  </div>
                </>
              ) : (
                <span className="chatbox-empty-message text-[15px]">
                  {" "}
                  Select a chat to start conversation{" "}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
