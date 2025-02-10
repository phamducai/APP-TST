import { call, put } from 'redux-saga/effects';
import {
  VIDEO_CATEGORY_FETCH_SUCCESS,
  VIDEO_CATEGORY_FETCH_ERROR,
  VIDEO_CATEGORY_FETCH_BY_ID_SUCCESS,
  VIDEO_CATEGORY_FETCH_BY_ID_ERROR,
  VIDEO_CATEGORY_CREATE_SUCCESS,
  VIDEO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';
import {
  fetchVideoCategories,
  fetchVideoCategoryById,
  createVideoCategory,
  countVideoCategories,
} from '../apis/video-category';

export function* fetchVideoCategoriesSaga(params) {
  try {
    const response = yield call(fetchVideoCategories, params);
    
    const {items, total} = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_CATEGORY_FETCH_SUCCESS, videoCategories: items, total: total });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_CATEGORY_FETCH_ERROR, error });
  }
}

export function* fetchVideoCategoryByIdSaga(params) {
  try {
    const response = yield call(fetchVideoCategoryById, params);
    const videoCategory = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_CATEGORY_FETCH_BY_ID_SUCCESS, videoCategory });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_CATEGORY_FETCH_BY_ID_ERROR, error });
  }
}

export function* createVideoCategorySaga(params) {
  try {
    const response = yield call(createVideoCategory, params);
    const videoCategory = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_CATEGORY_CREATE_SUCCESS, videoCategory });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_CATEGORY_CREATE_ERROR, error });
  }
}
