import { useContext } from 'react';
import { NextPage } from 'next';
import { TextField, Box, Button, Typography } from '@material-ui/core';
import CommonContext from '../states/context';
import useHandleSignUp from '../hooks/useHandleSignUp';

const Signup: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [user, setUser, onSignupSubmit] = useHandleSignUp(state, dispatch);

  return (
    !state.user.email && (
      <div>
        <Typography variant="h1">新規登録</Typography>
        <form onSubmit={onSignupSubmit}>
          <TextField
            fullWidth
            error={state.error.errorPart === 'email'}
            label="Eメール"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="example@example.com"
            variant="outlined"
          />
          <TextField
            fullWidth
            error={state.error.errorPart === 'password'}
            type="password"
            label="パスワード"
            autoComplete="off"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            style={{ marginBottom: 16 }}
            placeholder="●●●●●●●●"
            variant="outlined"
          />
          <TextField
            fullWidth
            error={state.error.errorPart === 'pwConfirm'}
            type="password"
            label="パスワード（確認用）"
            autoComplete="off"
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
