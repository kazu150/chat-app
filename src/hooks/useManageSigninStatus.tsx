import { useEffect } from 'react';
import { Action } from '../states/reducer';
import manageSignInStatus from '../firebase/manageSignInStatus';

const useManageSigninStatus = (dispatch: React.Dispatch<Action>): void => {
  useEffect(() => {
    // let publicProfiles: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = null;
    // const unsubscribe =
    manageSignInStatus(dispatch);
    return () => {
      // publicProfiles && publicProfiles;
      // unsubscribe();
    };
  }, [dispatch]);
};

export default useManageSigninStatus;
