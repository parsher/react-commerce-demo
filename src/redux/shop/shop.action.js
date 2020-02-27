// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
//t
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// redux-thunk => can fire function in the redux, multiple actions
// export const fetchCollectionsStartAsync = () => {
//   // return the function, not object : redux thunk
//   return dispatch => {
//     const collectionRef = firestore.collection("collections");
//     // start
//     dispatch(fetchCollectionsStart());

//     collectionRef.get().then(snapShot => {
//       const collectionMap = convertCollectionsSnapshotToMap(snapShot);
//       dispatch(fetchCollectionsSuccess(collectionMap));
//     }).catch(error => {
//       dispatch(fetchCollectionsFailure(error.message));
//     });
//   };
// };