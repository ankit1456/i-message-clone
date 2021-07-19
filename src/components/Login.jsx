import React from "react";
import "../css/login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className='login'>
      <div className='login__logo'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png'
          alt='logo'
        />

        <h1> iMessage</h1>
      </div>

      <Button type='submit' onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
};

export default Login;
