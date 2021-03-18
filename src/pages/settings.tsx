import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { TextField, Button, Box, Grid, Typography } from '@material-ui/core';
import CommonContext from '../states/context';
import { db } from '../../firebase';

const Settings: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [data, setData] = useState({
    thumb: 'avatar.png',
    name: '',
  });
  useEffect(() => {
    console.log(data);
  });

  useEffect(() => {
    setData({ thumb: state.user.thumb, name: state.user.name });
  }, [state.user]);

  useEffect(() => {
    const f = async () => {
      try {
        if (state.user.email) return;
        await Router.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [state.user.email]);

  const onSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ユーザー名は入力されているか
    if (data.name === '') {
      dispatch({ type: 'errorEmptyName' });
      return;
    }
    console.log(state.user.id);
    try {
      await db
        .collection('publicProfiles')
        .doc(state.user.id)
        .update({ thumb: data.thumb, name: data.name });

      dispatch({ type: 'userModProfile', payload: data });
      await Router.push('/chat');
    } catch (error) {
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${error.message} [on settings]`,
      });
    }
  };
  return (
    state.user.email && (
      <div>
        <Typography variant="h1">ユーザー設定</Typography>
        <form onSubmit={onSettingsSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="body1">メールアドレス：</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{state.user.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">プロフィール画像：</Typography>
              <Button variant="contained" color="secondary">
                変更
              </Button>
            </Grid>
            <Grid item xs={8}>
              <img src={data.thumb} width={150} height={150} alt="アバター" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">ユーザー名：</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                error={state.error.errorPart === 'name'}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
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
            {state.user.name && (
              <Box component="span" m={1}>
                <Button
                  onClick={() => Router.push('/chat')}
                  variant="contained"
                  color="secondary"
                >
                  保存せずチャットへ
                </Button>
              </Box>
            )}
          </Box>
        </form>
      </div>
    )
  );
};

export default Settings;
