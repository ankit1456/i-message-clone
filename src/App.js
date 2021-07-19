import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Imessage from "./components/Imessage";
import { auth } from "./firebase";
import Login from "./components/Login";
import { selectUser, logout, login } from "./redux/userSlice";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            displayName: authUser.displayName,
            photo: authUser.photoURL,
            uid: authUser.uid,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div className='app'>{user ? <Imessage /> : <Login />}</div>;
};

export default App;
