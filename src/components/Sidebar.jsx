import React, { useState, useEffect } from "react";
import "../css/sidebar.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import { Tooltip, TextField, Button } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { withStyles } from "@material-ui/core/styles";
import { auth, db } from "../firebase";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import firebase from "firebase";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    db.collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChat(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const addChannel = () => {
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setChatName("");
      setOpen(false);
    }
  };

  return (
    <div className='sidebar'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={() => setOpen(false)}
        className='sidebar__addChatModal'
      >
        <Fade in={open}>
          <div className='sidebar__addChatModalContainer'>
            <h2>Add Channel</h2>
            <TextField
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              id='outlined-basic'
              label='Enter Channel Name'
              variant='outlined'
              margin='dense'
            />
            <Button onClick={addChannel} className='sidebar__addChannelButton'>
              Add Channel
            </Button>
          </div>
        </Fade>
      </Modal>
      <div className='sidebar__header'>
        <LightTooltip title='Logout'>
          <Avatar
            onClick={() => auth.signOut()}
            src={user.photo}
            className='sidebar__avatar'
          />
        </LightTooltip>

        <div className='sidebar__input'>
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='sidebar__actions'>
        <Button onClick={() => auth.signOut()}>SignOut</Button>
        <Button onClick={() => setOpen(true)}>Add Chat</Button>
      </div>
      <div className='sidebar__chats'>
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat
            handleClose={() => setOpen(false)}
            key={id}
            chatId={id}
            chatName={chatName}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
