import {call, put} from 'redux-saga/effects';
import {
  BOOK_COLLECTION_FETCH_SUCCESS,
  BOOK_COLLECTION_FETCH_ERROR,
  BOOK_COLLECTION_FETCH_BY_ID_SUCCESS,
  BOOK_COLLECTION_FETCH_BY_ID_ERROR,
  BOOK_COLLECTION_CREATE_SUCCESS,
  BOOK_COLLECTION_CREATE_ERROR,
} from '../actions/actionTypes';
import {
  fetchBookCollections,
  fetchBookCollectionById,
  createBookCollection,
  countBookCollections,
} from '../apis/book-collection';

export function* fetchBookCollectionsSaga(params) {
  try {
    const response = yield call(fetchBookCollections, params);
    yield put({
      type: BOOK_COLLECTION_FETCH_SUCCESS,
      bookCollections: response.data.items,
      totalBookCollections: response.data.total,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_COLLECTION_FETCH_ERROR, error});
  }
}

export function* fetchBookCollectionByIdSaga(params) {
  try {
    const response = yield call(fetchBookCollectionById, params);
    // dispatch a success action to the store with the new dog
    yield put({
      type: BOOK_COLLECTION_FETCH_BY_ID_SUCCESS,
      bookCollection: response.data.items,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_COLLECTION_FETCH_BY_ID_ERROR, error});
  }
}

export function* createBookCollectionSaga(params) {
  try {
    const response = yield call(createBookCollection, params);
    const bookCollection = response.data;
    // dispatch a success action to the store with the new dog
    yield put({
      type: BOOK_COLLECTION_CREATE_SUCCESS,
      audioCategory: bookCollection,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_COLLECTION_CREATE_ERROR, error});
  }
}
