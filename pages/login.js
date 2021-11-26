import { Grid, Typography } from "@mui/material";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/initAuth";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../components/Login.jsx"));

function LoginPage() {
  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  };
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
          firebaseAuth={firebase.auth()}
          uiConfig={uiConfig}
        />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
