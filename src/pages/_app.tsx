import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import theme from '../theme/theme';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import CommonContext from '../context';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CommonContext.Provider value={{ auth, setAuth }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Container maxWidth="sm">
            <Component {...pageProps} />
          </Container>
          <Footer />
        </ThemeProvider>
      </CommonContext.Provider>
    </>
  );
}
