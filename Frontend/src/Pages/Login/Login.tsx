import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { auth, updateFirestoreUser } from "../../firebase-config";

import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import "./Login.css";
import "../../index.css";

const useStyles = makeStyles({
  button: {
    alignSelf: "center",
  },
});

function Login() {
  const classes = useStyles();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const isNewUser = getAdditionalUserInfo(result);
        if (isNewUser) {
          const userData = {
            uid: user.uid,
            userName: user.displayName,
            profilePic: user.photoURL,
            investingStrategy: "",
            deposit: 0,
          };
          await updateFirestoreUser(user.uid, userData);
        } else {
          console.log("User already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="background">
      <div className="circle" />
      <div>
        <h1>All-in-one hub for beginner investors</h1>
        <h2>Investing made easy</h2>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{ color: "white" }}
          onClick={signInWithGoogle}
        >
          <div className="button">Get Started</div>
        </Button>
      </div>
    </div>
  );
}

export default Login;
