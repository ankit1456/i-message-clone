import React, { useState, useEffect, useRef } from "react";
import "../css/chat.css";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import Message from "./Message";
import { selectChatName, selectChatId } from "../redux/chatSlice";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../redux/userSlice";
import FlipMove from "react-flip-move";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Chat = ({ handleOpen }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  const messageEl = useRef(null);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          )
        );
    }
  }, [chatId]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatName) {
      return alert("Please select a  chat room 🙂");
    }
    if (input) {
      db.collection("chats").doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
      setInput("");
    }
  };
  return (
    <div className='chat'>
      <div className='chat__header'>
        {matches && <MenuIcon onClick={handleOpen} />}
        <h4>
          To: <span className='chat__name'>{chatName || "Select Chats"}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className='chat__messages' ref={messageEl}>
        <FlipMove>
          {messages.map(({ id, data }) => {
            return <Message key={id} id={id} contents={data} />;
          })}
        </FlipMove>
        <div
          className='chat__downbtn'
          onClick={() => {
            messageEl.current.scrollTo({
              left: 0,
              top: messageEl.current.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <ArrowDownwardIcon className='downbtn' />
        </div>
      </div>

      <div className='chat__input'>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Send Message'
          ></input>
          <button type='submit' onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <IconButton>
          <MicNoneIcon className='chat__mic' />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
