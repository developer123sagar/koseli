import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BsCheckCircleFill,
  BsInfoCircle,
  BsExclamationCircle,
  BsXCircle,
} from "react-icons/bs";
import { MessageType } from "@/types";

type Props = {
  messages: MessageType[];
  setMessages?: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

const ToastMsg: React.FC<Props> = ({ messages, setMessages }) => {
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        if (setMessages) setMessages((prevMessages) => prevMessages.slice(1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [messages, setMessages]);

  const getIcon = (theme: string) => {
    switch (theme) {
      case "success":
        return <BsCheckCircleFill />;
      case "warn":
        return <BsExclamationCircle />;
      case "fail":
        return <BsXCircle />;
      case "info":
        return <BsInfoCircle />;
      default:
        return <BsCheckCircleFill />;
    }
  };

  return (
    <AnimatePresence>
      {messages?.map((message) => (
        <motion.div
          key={message.id}
          className={`alert_container ${message.theme} z-[9999] w-[400px]`}
          initial={{
            x: 1000,
            opacity: 0,
          }}
          animate={{
            x: 600,
            opacity: 1,
          }}
          exit={{
            x: 1000,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 240,
          }}
        >
          <div className={`alert_container-icon z-[9999] ${message.theme}`}>
            {getIcon(message.theme)}
          </div>
          <p className="w-[400px] text-black !important">{message.msg}</p>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default ToastMsg;
