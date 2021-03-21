/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db, firebase } from '../../firebase';
import formatDate from '../utils/formatDate';
import { Action } from '../states/reducer';

const fetchRooms = (dispatch: React.Dispatch<Action>): void => {
  db.collection('rooms').onSnapshot(
    (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => {
      const formedSnapshot = snapshot.docs.map((doc) => {
        const date: Date = doc.data().createdAt?.toDate();
        const formattedDate = formatDate(date);

        return {
          id: doc.id,
          createdAt: formattedDate,
          description: doc.data().description as string,
          title: doc.data().title as string,
        };
      });
      dispatch({ type: 'roomsFetch', payload: formedSnapshot });
    }
  );
};

export default fetchRooms;
