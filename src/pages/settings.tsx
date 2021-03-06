/* eslint-disable react/jsx-curly-newline */
import { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import CommonContext from '../states/context';
import useHandleSettings from '../hooks/useHandleSettings';
import onImageSet from '../utils/onImageSet';

const Settings: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [onSettingsSubmit, data, setData, setSrc] = useHandleSettings(
    state,
    dispatch
  );
  const matches = useMediaQuery('(min-width:600px)');

  return (
    state.user.email && (
      <div>
        <Head>
          <title>ゆるふわちゃっと | ユーザー設定</title>
        </Head>
        <Typography variant="h1">ユーザー設定</Typography>
        <form onSubmit={onSettingsSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography variant="body1">
                {matches ? `メールアドレス：` : `アドレス：`}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{state.user.email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                {matches ? `プロフィール画像：` : `プロフ画像：`}
              </Typography>
              <label htmlFor="file" style={{ position: 'relative' }}>
                <Button
                  style={{ position: 'absolute' }}
                  variant="contained"
                  color="default"
                >
                  変更
                </Button>
                <div
                  style={{
                    position: 'absolute',
                    width: '64px',
                    height: '36px',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    onImageSet(e, setSrc, data, setData, dispatch)
                  }
                />
              </label>
            </Grid>
            <Grid item xs={8}>
              <img
                src={data.thumb || '/avatar.png'}
                width={150}
                height={150}
                alt="アバター"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">ユーザー名：</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                autoFocus
                fullWidth
                error={state.error.errorPart === 'name'}
                value={data.name}
                onChange={(e) =>
                  setData({ thumb: data.thumb, name: e.target.value })
                }
                style={{ marginBottom: 40 }}
                placeholder="クロネコ太郎"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box textAlign="center" style={{ marginBottom: 16 }}>
            <Box component="span" m={1}>
              <Button
                onClick={() => Router.push(`/chat/${state.currentRoom}`)}
                variant="contained"
                color="default"
              >
                キャンセル
              </Button>
            </Box>
            <Box component="span" m={1}>
              <Button type="submit" variant="contained" color="primary">
                保存してチャットへ
              </Button>
            </Box>
          </Box>
        </form>
      </div>
    )
  );
};

export default Settings;
