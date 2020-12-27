import { createChatBotMessage } from "react-chatbot-kit";
const botName = "SCS BOT";
const config = {
  botName: botName,
  lang: "no",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Hi There!`)],
};

export default config;
