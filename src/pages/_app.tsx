import { useEffect, useReducer } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import theme from '../theme';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CommonContext from '../states/context';
import { reducer } from '../states/reducer';
import initialState from '../states/initialState';
import useManageSigninStatus from '../hooks/useManageSigninStatus';
import Dialog from '../components/molecules/Dialog';

type Props = {
  Component: NextPage;
};

const MyApp: NextPage<Props> = ({ Component }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useManageSigninStatus(dispatch, state);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    console.log(state);
  });

  return (
    <>
      <Head>
        <title>リアルタイムチャット</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CommonContext.Provider value={{ dispatch, state }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Dialog />
          <Container maxWidth="sm">
            <Component />
          </Container>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={state.error.isOpened}
            onClose={() => dispatch({ type: 'errorClose' })}
          >
            <MuiAlert
              elevation={6}
              severity="error"
              onClose={() => dispatch({ type: 'errorClose' })}
              variant="filled"
            >
              {state.error.message}
            </MuiAlert>
          </Snackbar>
          <Footer />
        </ThemeProvider>
      </CommonContext.Provider>
    </>
  );
};

export default MyApp;
