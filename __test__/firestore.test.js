process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
process.env.FIREBASE_DATABASE_EMULATOR_HOST = "localhost:9000";

const firebase = require('@firebase/rules-unit-testing');
const fs = require('fs');

const project_id = "my-project-id";
const databaseName = "my-db";

describe("Firestoreのテスト", () => {

    //実行前に一度だけ実行（初期化）
    beforeAll(
        async () => {
            await firebase.loadFirestoreRules({
                projectId: project_id,
                rules: fs.readFileSync('./firestore.rules', 'utf8'),
            });
        }
    );

    //ブロックが終わるたび実行
    afterEach(
        async () => {
            await firebase.clearFirestoreData({ projectId: project_id }); //データリセット
        }
    );

    //終わった後に一度だけ実行
    afterAll(
        async () => {
            await Promise.all(
                firebase.apps().map((app) => app.delete()) //生成したアプリを削除
            );
        }
    );

    // 認証する
    function authedApp(auth) {
        return firebase.initializeTestApp({
            projectId: project_id,
            databaseName: databaseName,
            auth: auth
        }).firestore();
    }

    describe("publicProfilesコレクション", () => {

        test("サインイン時に自userの読取りが成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertSucceeds(db.collection('publicProfiles').doc('c05cDZITKVZH5930b6FotWsYLvF3').get());
        })

        test("サインイン時に別userの読取りが成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertSucceeds(db.collection('publicProfiles').doc('qwertyuio1234560asdfghjadfafs').get());
        })

        test("正しいデータでのpublicProfiles新規登録が成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertSucceeds(db.doc('publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3').set({
                name: '名無しさん',
                thumb: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }));
        })

        test("間違ったデータでのpublicProfiles新規登録が失敗するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertFails(db.doc('publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3').set({
                name: '',
                thumb: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                hoge: 'aa'
            }));
        })

        test("正しいデータでのpublicProfilesの上書きが成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await db.doc('publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3').set({
                name: '',
                thumb: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            await firebase.assertSucceeds(
                db.doc(`publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3`).update({
                    name: 'newName',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
            );
        })

        test("間違ったデータでのpublicProfilesの上書きが失敗するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await db.doc('publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3').set({
                name: '',
                thumb: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            await firebase.assertFails(
                db.doc(`publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3`).update({
                    name: 'newName',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    hoge: 1234
                })
            );
        })
    })

    describe("roomsコレクション", () => {

        test("正しいデータでのroomsの新規登録が成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertSucceeds(db.collection('rooms').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                title: '新しいルーム',
                description: '新しいルームの説明です',
            }));
        })

        test("間違ったデータでのroomsの新規登録が失敗するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertFails(db.collection('rooms').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                title: '新しいルーム',
                description: '新しいルームの説明ですけど今回に限っては文字数をめっちゃ増やしてエラーを出せるか確認です',
            }));
        })
    })

    describe("rooms > chatsサブコレクション", () => {
        test("正しいデータでのchatsの新規登録が成功するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertSucceeds(db.doc('rooms/aqwsedrftgyhujikol222').collection('chats').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                description: '投稿内容をこちらに記入！！！',
                publicProfiles: db.doc(`publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3`)
            }));
        })

        test("間違ったデータでのchatsの新規登録が失敗するか", async () => {
            //条件（uidやprojectId)を指定してdbを生成
            const db = authedApp({ uid: "c05cDZITKVZH5930b6FotWsYLvF3"});
            await firebase.assertFails(db.doc('rooms/aqwsedrftgyhujikol222').collection('chats').add({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                description: '投稿内容をこちらに記入！！！',
                publicProfiles: db.doc(`publicProfiles/c05cDZITKVZH5930b6FotWsYLvF3`),
                hoge: 'fdasfsfa'
            }));
        })
    })
})


// 参考1 https://qiita.com/zaburo/items/e82cff108690eb0493c0
// 参考2 https://zenn.dev/kinmi/articles/firestore-rules-jest