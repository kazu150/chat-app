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
import { auth } from '../../firebase';

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

  // キャッシュからのログイン。DBとつないだ後に設定
  // useEffect(() => {
  //   let userInfo = null;
  //   let publicUserInfo = null;

  //   // ユーザーのログイン状態を監視
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     try {
  //       // ユーザーが検出されたら、signInの処理
  //       if (user) {
  //         userInfo = await db.collection('users').doc(user.uid).get();

  //         publicUserInfo = await db
  //           .collection('publicProfiles')
  //           .doc(user.uid)
  //           .get();

  //         dispatch({
  //           type: 'userSignin',
  //           payload: {
  //             userId: user.uid,
  //             name: user.displayName,
  //             initialTime: userInfo.data()?.initialTime || '',
  //             englishService: userInfo.data().englishService?.id || '',
  //             studyTime: publicUserInfo.data()?.studyTime || '',
  //             photoUrl: publicUserInfo.data()?.photoUrl || '',
  //           },
  //         });
  //         // ユーザーが検出されなかったら、signOutの処理
  //       } else {
  //         await auth.signOut();
  //         dispatch({ type: 'userSignout' });
  //         Router.push('/');
  //         return;
  //       }
  //     } catch (error) {
  //       dispatch({
  //         type: 'errorOther',
  //         payload: '認証関係でエラーが発生しました',
  //       });
  //     }
  //   });
  //   return () => {
  //     userInfo && userInfo;
  //     publicUserInfo && publicUserInfo;
  //     unsubscribe();
  //   };
  // }, []);

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
