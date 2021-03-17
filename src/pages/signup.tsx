import { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import CommonContext from '../states/context';

const Signup: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    pwConfirm: '',
  });

  const onSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    dispatch({
      type: 'userSignUp',
      payload: { email: user.email },
    });
    await Router.push('/settings');
  };

  // SignInSubmitとバッティングするためいまは保留
  useEffect(() => {
    if (!state.user.email) return;
    if (submitting) return;
    Router.push('/chat');
    return () => {
      setSubmitting(false);
    };
  }, [state.user.email, submitting]);

  return (
    !state.user.email && (
      <div>
        <Typography variant="h1">新規登録</Typography>
        <form onSubmit={onSignupSubmit}>
          <TextField
            required
            fullWidth
            label="Eメール"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="example@example.com"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="パスワード"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            label="パスワード（確認用）"
            onChange={(e) => setUser({ ...user, pwConfirm: e.target.value })}
            style={{ marginBottom: 40 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              新規登録
            </Button>
          </Box>
        </form>
      </div>
    )
  );
};

export default Signup;
