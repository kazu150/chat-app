import { db } from '../../firebase';
import { Action } from '../states/reducer';
import { PublicProfiles } from '../states/initialState';

const fetchUsers = (dispatch: React.Dispatch<Action>): (() => void) => {
  // 各ユーザーの情報を取得
  const unsubscribe = db.collection('publicProfiles').onSnapshot((snapshot) => {
    const formedSnapshot: PublicProfiles[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name as string,
      thumb: doc.data().thumb as string,
    }));
    dispatch({ type: 'setPublicProfiles', payload: formedSnapshot });
  });

  return unsubscribe;
};

export default fetchUsers;
