import {call, put} from 'redux-saga/effects';
import {
  AUDIO_FETCH_SUCCESS,
  AUDIO_FETCH_ERROR,
  AUDIO_FETCH_BY_ID_SUCCESS,
  AUDIO_FETCH_BY_ID_ERROR,
  AUDIO_CREATE_SUCCESS,
  AUDIO_CREATE_ERROR,
  AUDIO_DELETE_SUCCESS,
  AUDIO_DELETE_ERROR,
} from '../actions/actionTypes';
import {
  fetchAudios,
  fetchAudioById,
  createAudio,
  countAudios,
  deleteAudioById,
} from '../apis/audio';

export function* fetchAudiosSaga(params) {
  try {
    const response = yield call(fetchAudios, params);
    const {data} = yield call(countAudios);
    const audios = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: AUDIO_FETCH_SUCCESS, audios, totalAudios: data.count});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_FETCH_ERROR, error});
  }
}

export function* fetchAudioByIdSaga(params) {
  try {
    const response = yield call(fetchAudioById, params);
    const audio = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: AUDIO_FETCH_BY_ID_SUCCESS, audio});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_FETCH_BY_ID_ERROR, error});
  }
}

export function* createAudioSaga(params) {
  try {
    const response = yield call(createAudio, params);
    const audio = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: AUDIO_CREATE_SUCCESS, audio});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_CREATE_ERROR, error});
  }
}

export function* deleteAudioSaga(params) {
  try {
    const response = yield call(deleteAudioById, params);

    // dispatch a success action to the store with the new dog
    yield put({type: AUDIO_DELETE_SUCCESS, success: response.data !== null});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_DELETE_ERROR, error});
  }
}
