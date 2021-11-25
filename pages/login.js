import { Grid, Typography } from "@mui/material";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/initAuth";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("../components/Login.jsx"));
// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

function login() {
  return (
    <Grid container spacing={12}>
      <Grid item>
        <Login />
      </Grid>

      <Grid item>
        <Typography>Or</Typography>
      </Grid>

      <Grid item>
        {" "}
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Grid>
    </Grid>
  );
}

export default login;
