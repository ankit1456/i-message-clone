import React, { useState } from "react";
import "../css/imessage.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const Imessage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(true);
  return (
    <div className='Imessage'>
      {matches ? (
        <SwipeableDrawer
          className='Imessage__swiper'
          anchor='left'
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Sidebar setOpenSidebar={setOpen} />
        </SwipeableDrawer>
      ) : (
        <Sidebar />
      )}

      <Chat handleOpen={() => setOpen(true)} />
    </div>
  );
};

export default Imessage;
