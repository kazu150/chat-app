/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db, firebase } from '../../firebase';
import { User } from './fetchUsers';
import formatDate from '../utils/formatDate';

export type Chat = {
  id: number;
  name: string;
  thumb: string;
  createdAt: string;
  description: string;
};

const fetchPosts = (
  roomId: string,
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  users: User[]
): void => {
  // roomIdを取得できるまで処理しない
  if (!roomId) return;

  db.collection('rooms')
    .doc(roomId)
    .collection('chats')
    .onSnapshot(
      (
        snapshot: firebase.firestore.QuerySnapshot<
          firebase.firestore.DocumentData
        >
      ) => {
        const formedSnapshot = snapshot.docs.map((doc) => {
          const filteredUser = users.filter(
            (user) => user.id === doc.data().publicProfiles?.id
          )[0];
          const date: Date = doc.data().createdAt?.toDate();
          const formattedDate = formatDate(date);

          return {
            id: Number(doc.id),
            name: filteredUser?.name,
            thumb: filteredUser?.thumb,
            createdAt: formattedDate,
            description: doc.data().description as string,
          };
        });

        setChats(formedSnapshot);
      }
    );
};

export default fetchPosts;
