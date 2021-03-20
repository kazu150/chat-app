import { db } from '../../firebase';

export type User = {
  id: string;
  name: string;
  thumb: string;
};

const fetchUsers = (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): void => {
  // 各ユーザーの情報を取得
  db.collection('publicProfiles').onSnapshot((snapshot) => {
    const formedSnapshot = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
      thumb: doc.data().thumb as string,
    }));
    setUsers(formedSnapshot);
  });
};

export default fetchUsers;
