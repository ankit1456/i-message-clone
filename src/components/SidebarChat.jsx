import React, { useState, useEffect } from "react";
import "../css/sidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import { db } from "../firebase";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const SidebarChat = ({ chatId, chatName, handleClose }) => {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [chatId]);

  const selectChat = () => {
    dispatch(
      setChat({
        chatId: chatId,
        chatName: chatName,
      })
    );
    handleClose();
  };
  return (
    <div className='sidebarChat' onClick={selectChat}>
      <Avatar src={chatInfo[0]?.photo || user.photo}>
        {user.displayName[0].toUpperCase()}{" "}
      </Avatar>
      <div className='sidebarChat__info'>
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small className='sidebarChat__timestamp'>
          {chatInfo[0]?.timestamp
            ? moment(
                new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()
              ).fromNow()
            : ""}
        </small>
      </div>
    </div>
  );
};

export default SidebarChat;
