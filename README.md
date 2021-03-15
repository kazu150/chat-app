## チャットアプリ
会員登録機能付きのチャットアプリです。
### 機能要件
- 会員登録機能
- 会員登録時の画像・ユーザーネームの登録
- リアルタイムでの複数人でのチャット
### ディレクトリ構成
- pages :各ページを構成するコンポーネント
- components :個別のコンポーネント
-  └atoms: 最小単位のパーツ
-  └molecules: 少し大きめパーツ
- hooks: customHookで切り分けたロジック部分
- apis: APIの設定関係のファイル
- reducer: reducerファイル
- context: contextファイル
### 使用ツール・ライブラリ
- Next.js
- React + hooks
- axios
- Day.js
- firestore
- firebase authentication
- TypeScript
- Material-UI
- EsLint
- prettier
### 作成環境バージョン情報
- Node.js v14.4.0
- npm v6.14.5