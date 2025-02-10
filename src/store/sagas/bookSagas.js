import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put} from 'redux-saga/effects';
import {BOOK_BOOKMARK} from '../../../utils/storage';
import {
  BOOK_FETCH_SUCCESS,
  BOOK_FETCH_ERROR,
  BOOK_FETCH_BY_ID_SUCCESS,
  BOOK_FETCH_BY_ID_ERROR,
  BOOK_GET_BOOKMARK_SUCCESS,
  BOOK_GET_BOOKMARK_ERROR,
} from '../actions/actionTypes';
import {fetchBooks, fetchBookById} from '../apis/book';

export function* fetchBooksSaga(params) {
  try {
    const response = yield call(fetchBooks, params);
    const books = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: BOOK_FETCH_SUCCESS, books});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_FETCH_ERROR, error});
  }
}

export function* fetchBookByIdSaga(params) {
  try {
    const response = yield call(fetchBookById, params);
    const book = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: BOOK_FETCH_BY_ID_SUCCESS, book});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_FETCH_BY_ID_ERROR, error});
  }
}

export function* getBookmarksSage() {
  try {
    const response = yield call(AsyncStorage.getItem, BOOK_BOOKMARK);
    const bookmarks = response ? JSON.parse(response) : {};
    // dispatch a success action to the store with the new bookmarks
    yield put({type: BOOK_GET_BOOKMARK_SUCCESS, bookmarks});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: BOOK_GET_BOOKMARK_ERROR, error});
  }
}
