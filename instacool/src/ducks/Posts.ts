import { Dispatch, AnyAction } from "redux";
import { IServices } from "../services";
import { firestore } from "firebase";

const START = 'post/fetch-start';
const SUCCESS = 'post/fetch-success';
const ERROR = 'post/fetch-error';

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
  async (dispatch: Dispatch, getState: () => any, { }: IServices) => {
    console.log(id);

  }
)

export const share = (id: string) => (
  async (dispatch: Dispatch, getState: () => any, { }: IServices) => {
    console.log(id);

  }
)