import {call, put} from 'redux-saga/effects';
import {
  AUDIO_CATEGORY_FETCH_SUCCESS,
  AUDIO_CATEGORY_FETCH_ERROR,
  AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS,
  AUDIO_CATEGORY_FETCH_BY_ID_ERROR,
  AUDIO_CATEGORY_CREATE_SUCCESS,
  AUDIO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';
import {
  fetchAudioCategories,
  fetchAudioCategoryById,
  createAudioCategory,
} from '../apis/audio-category';

export function* fetchAudioCategoriesSaga(params) {
  try {
    const response = yield call(fetchAudioCategories, params);
    // dispatch a success action to the store with the new dog
    yield put({
      type: AUDIO_CATEGORY_FETCH_SUCCESS,
      audioCategories: response.data.items,
      total: response.data.total,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_CATEGORY_FETCH_ERROR, error});
  }
}

export function* fetchAudioCategoryByIdSaga(params) {
  try {
    const response = yield call(fetchAudioCategoryById, params);
    // dispatch a success action to the store with the new dog
    yield put({
      type: AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS,
      audioCategory: response.data.items,
      totalCollections: response.data.total,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_CATEGORY_FETCH_BY_ID_ERROR, error});
  }
}

export function* createAudioCategorySaga(params) {
  try {
    const response = yield call(createAudioCategory, params);
    const audioCategory = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: AUDIO_CATEGORY_CREATE_SUCCESS, audioCategory});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: AUDIO_CATEGORY_CREATE_ERROR, error});
  }
}
