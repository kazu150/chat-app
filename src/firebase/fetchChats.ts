/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db, firebase } from '../../firebase';
import { User } from './fetchUsers';

export type Chat = {
  id: number;
  name: string;
  thumb: string;
  createdAt: string;
  description: string;
};

const fetchChats = (
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>,
  users: User[]
): void => {
  db.collection('chats').onSnapshot(
    (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => {
      const formedSnapshot = snapshot.docs.map((doc) => {
        const filteredUser = users.filter(
          (user) => user.id === doc.data().publicProfiles.id
        )[0];
        const date: Date = doc.data().createdAt?.toDate();
        const y = date?.getFullYear();
        const m = `00${date?.getMonth() + 1}`.slice(-2);
        const d = `00${date?.getDate()}`.slice(-2);
        const h = `00${date?.getHours()}`.slice(-2);
        const min = `00${date?.getMinutes()}`.slice(-2);
        const formedDate = date ? `${y}/${m}/${d} ${h}:${min}` : '　';

        return {
          id: Number(doc.id),
          name: filteredUser?.name,
          thumb: filteredUser?.thumb,
          createdAt: formedDate,
          description: doc.data().description as string,
        };
      });

      setChats(formedSnapshot);
    }
  );
};

export default fetchChats;
