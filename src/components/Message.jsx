import React, { forwardRef } from "react";
import "../css/message.css";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, photo, message, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__sender"}`}
      >
        <Avatar src={photo} className='message__photo' />
        <p>{message}</p>
        <small>
          {timestamp
            ? moment(new Date(timestamp?.toDate()).toLocaleString()).fromNow()
            : ""}
        </small>
      </div>
    );
  }
);

export default Message;
