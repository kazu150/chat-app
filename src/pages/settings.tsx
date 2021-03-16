import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { TextField, Button, Box, Grid, Typography } from '@material-ui/core';
import CommonContext from '../context';

const settings = () => {
  const { auth } = useContext(CommonContext);

  useEffect(() => {
    !auth && Router.push('/');
  }, [auth]);

  const onSettingsSubmit = (e) => {
    e.preventDefault();
    Router.push('/chat');
  };
  return (
    auth && (
      <div>
        <Typography variant="h1">ユーザー設定</Typography>
        <form onSubmit={onSettingsSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="body1">メールアドレス：</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">example@example.com</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">プロフィール画像：</Typography>
              <Button variant="contained" color="secondary">
                変更
              </Button>
            </Grid>
            <Grid item xs={8}>
              <img src="avatar.png" width={150} height={150} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">ユーザーネーム：</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                style={{ marginBottom: 40 }}
                placeholder="クロネコ太郎"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box textAlign="center" style={{ marginBottom: 16 }}>
            <Box component="span" m={1}>
              <Button type="submit" variant="contained" color="primary">
                保存してチャットへ
              </Button>
            </Box>
            <Box component="span" m={1}>
              <Button
                onClick={() => Router.push('/chat')}
                variant="contained"
                color="secondary"
              >
                保存せずにチャットへ
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    )
  );
};

export default settings;
