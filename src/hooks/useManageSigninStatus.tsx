import { useEffect } from 'react';
import { Action } from '../states/reducer';
import manageSignInStatus from '../firebase/manageSignInStatus';
import { auth, db, firebase } from '../../firebase';

const useManageSigninStatus = (dispatch: React.Dispatch<Action>): void => {
  useEffect(() => {
    let publicProfiles: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = null;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      publicProfiles = await db
        .collection('publicProfiles')
        .doc(user.uid)
        .get();

      await manageSignInStatus(dispatch, user, publicProfiles);
    });

    return () => {
      publicProfiles;
      publicProfiles();
      unsubscribe();
      unsubscribe;
    };
  }, [dispatch]);
};

export default useManageSigninStatus;
