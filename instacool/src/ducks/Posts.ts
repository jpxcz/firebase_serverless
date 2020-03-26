import { Dispatch, AnyAction } from "redux";
import { IServices } from "../services";
import { firestore } from "firebase";
import { download } from "../utils";

const START = 'post/fetch-start';
const SUCCESS = 'post/fetch-success';
const ERROR = 'post/fetch-error';
const ADD = 'post/add'

export interface IDataPosts {
  [key: string]: {
    comment: string,
    userId: string,
    createdAt: firestore.Timestamp,
    imageURL: string,
  }
}

const fetchStart = () => ({
  type: START,
});

const fetchSuccess = (payload: IDataPosts) => ({
  type: SUCCESS,
  payload,
});

const fetchError = (error: Error) => ({
  type: START,
  error,
});

const add = (payload: IDataPosts) => ({
  type: ADD,
  payload,
})

const initialState = {
  data: {},
  fetched: false,
  fetching: false,
}

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case START:
      return {
        ...state,
        fetching: true,
      }
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetched: true,
        fetching: false,
      }
    case ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
      }
    case ADD:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        }
      }
    default:
      return state;
  }
}

export const fetchPosts = () => (
  async (dispatch: Dispatch, getState: () => any, { db, storage }: IServices) => {
    dispatch(fetchStart());
    try {
      const snaps = await db.collection('posts').get();
      const posts: any = {};
      snaps.forEach(s => {
        posts[s.id] = s.data();
      });

      const imgIds = await Promise.all(
        Object.keys(posts).map(async (p) => {
          const ref = storage.ref(`posts/${p}.jpeg`);
          const url = await ref.getDownloadURL();
          return [p, url];
        })
      );

      const keyedImages: any = {};
      imgIds.forEach(x => keyedImages[x[0]] = x[1]);

      Object.keys(posts).forEach(x => posts[x] = {
        ...posts[x],
        imageURL: keyedImages[x],
      });

      dispatch(fetchSuccess(posts));
    } catch (e) {
      dispatch(fetchError(e));
    }
  }
)

export const like = (id: string) => (
  async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
    if (!auth.currentUser) {
      return
    }

    const token = await auth.currentUser.getIdToken();

    await fetch(`/api/posts/${id}/like`, {
      headers: {
        authorization: token
      }
    });

  }
)

export const share = (id: string) => (
  async (dispatch: Dispatch, getState: () => any, { auth, db, storage }: IServices) => {
    if (!auth.currentUser) {
      return
    }

    const token = await auth.currentUser.getIdToken();
    const result = await fetch(`/api/posts/${id}/share`, {
      headers: {
        authorization: token
      }
    });

    const url = await storage.ref(`posts/${id}.jpeg`).getDownloadURL();
    const blob: any = await download(url);

    console.log("!!!!!!!!!!!!")
    console.log(result);
    const { id: postId }: { id: string } = await result.json();
    const ref = storage.ref(`posts/${postId}.jpeg`)
    await ref.put(blob);

    const imageURL = await ref.getDownloadURL();

    const snap = await db.collection('posts').doc(postId).get();


    dispatch(add({
      [snap.id]: {
        ...snap.data(),
        imageURL,
      }
    } as IDataPosts));


  }
)