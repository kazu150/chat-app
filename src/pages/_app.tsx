import { useEffect, useReducer } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import theme from '../theme';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CommonContext from '../states/context';
import { reducer } from '../states/reducer';
import initialState from '../states/initialState';

type Props = {
  Component: NextPage;
};

const MyApp: NextPage<Props> = ({ Component }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <title>My page</title>
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
          <Container maxWidth="sm">
            <Component />
          </Container>
          <Footer />
        </ThemeProvider>
      </CommonContext.Provider>
    </>
  );
};

export default MyApp;
