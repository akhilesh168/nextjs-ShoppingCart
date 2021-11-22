import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css";
import Layout from "../components/Layout.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/initAuth";
import { createContext } from "react";

import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import theme from "../styles/theme";
import "/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const UserContext = createContext();
function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Shopping Cart</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <UserContext.Provider
              value={{
                ...user,
              }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserContext.Provider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
