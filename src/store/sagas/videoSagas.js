import { call, put } from 'redux-saga/effects';
import {
  VIDEO_FETCH_SUCCESS,
  VIDEO_FETCH_ERROR,
  VIDEO_FETCH_BY_ID_SUCCESS,
  VIDEO_FETCH_BY_ID_ERROR,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_ERROR,
} from '../actions/actionTypes';
import { fetchVideos, fetchVideoById, createVideo, countVideos } from '../apis/video';

export function* fetchVideosSaga(params) {
  try {
    const response = yield call(fetchVideos, params);
    const { data } = yield call(countVideos);
    const videos = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_FETCH_SUCCESS, videos, total: data.count });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_FETCH_ERROR, error });
  }
}

export function* fetchVideoByIdSaga(params) {
  try {
    const response = yield call(fetchVideoById, params);
    const video = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_FETCH_BY_ID_SUCCESS, video });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_FETCH_BY_ID_ERROR, error });
  }
}

export function* createVideoSaga(params) {
  try {
    const response = yield call(createVideo, params);
    const video = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: VIDEO_CREATE_SUCCESS, video });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: VIDEO_CREATE_ERROR, error });
  }
}
