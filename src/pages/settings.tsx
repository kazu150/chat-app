import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { TextField, Button, Box, Grid, Typography } from '@material-ui/core';
import CommonContext from '../states/context';
import { db, firebase, storage } from '../../firebase';

const Settings: NextPage = () => {
  const { state, dispatch } = useContext(CommonContext);
  const [data, setData] = useState({
    thumb: '',
    name: '',
  });
  const [src, setSrc] = useState<File>(null);
  const [preview, setPreview] = useState('');

  // ページをロードした際に、ユーザー情報を更新
  useEffect(() => {
    setData({
      thumb: state.user.thumb,
      name: state.user.name,
    });
  }, [state.user]);

  const onSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ユーザー名は入力されているか
    if (data.name === '') {
      dispatch({ type: 'errorEmptyName' });
      return;
    }

    try {
      // cloud Storageに画像を保存
      await storage.ref(`/images/${src.name}`).put(src);

      // 保存したパスを返り値かなんかで取得
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const pathReference: Promise<string> = await storage
        .ref(`/images/${src.name}`)
        .getDownloadURL();

      // DBをupdate。thumbにはcloud storageの画像保存先パスを入れる
      await db.collection('publicProfiles').doc(state.user.id).update({
        thumb: pathReference,
        name: data.name,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      dispatch({ type: 'userModProfile', payload: data });
      await Router.push('/chat');
    } catch (error: unknown) {
      // エラー内容を型安全に処理するため、カスタム型に代入
      type CustomErrorType = { message: string };
      const customError = error as CustomErrorType;
      dispatch({
        type: 'errorOther',
        payload: `エラー内容：${customError.message} [on settings]`,
      });
    }
  };

  const onImageSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    // ローカルの画像ファイルをstateに設定
    setSrc(files[0]);
    // プレビュー画像をstateに設定
    setPreview(window.URL.createObjectURL(files[0]));
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
                  onChange={(e) => onImageSet(e)}
                />
              </label>
            </Grid>
            <Grid item xs={8}>
              <img
                src={preview || data.thumb || 'avatar.png'}
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
            {state.user.name && (
              <Box component="span" m={1}>
                <Button
                  onClick={() => Router.push('/chat')}
                  variant="contained"
                  color="default"
                >
                  キャンセル
                </Button>
              </Box>
            )}
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
