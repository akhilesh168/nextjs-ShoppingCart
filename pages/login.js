import { Grid, Typography } from "@mui/material";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Login from "../components/Login";
import firebase from "../firebase/initAuth";

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
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

export default SignInScreen;
