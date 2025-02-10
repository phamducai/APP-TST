import {call, put} from 'redux-saga/effects';
import {
  SUB_AUDIO_CATEGORY_FETCH_SUCCESS,
  SUB_AUDIO_CATEGORY_FETCH_ERROR,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_ERROR,
  SUB_AUDIO_CATEGORY_CREATE_SUCCESS,
  SUB_AUDIO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';
import {
  fetchSubAudioCategoryById,
  createSubAudioCategory,
  fetchSubAudioCategories,
  countSubAudioCategories,
} from '../apis/sub-audio-category';

export function* fetchSubAudioCategoriesSaga(params) {
  try {
    const response = yield call(fetchSubAudioCategories, params);
    const {data} = yield call(countSubAudioCategories);
    const subAudioCategories = response.data;
    // dispatch a success action to the store with the new dog
    yield put({
      type: SUB_AUDIO_CATEGORY_FETCH_SUCCESS,
      subAudioCategories,
      total: data.count,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: SUB_AUDIO_CATEGORY_FETCH_ERROR, error});
  }
}

export function* fetchSubAudioCategoryByIdSaga(params) {
  try {
    const response = yield call(fetchSubAudioCategoryById, params);
    const subAudioCategory = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: SUB_AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS, subAudioCategory});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: SUB_AUDIO_CATEGORY_FETCH_BY_ID_ERROR, error});
  }
}

export function* createSubAudioCategorySaga(params) {
  try {
    const response = yield call(createSubAudioCategory, params);
    const subAudioCategory = response.data;
    // dispatch a success action to the store with the new dog
    yield put({type: SUB_AUDIO_CATEGORY_CREATE_SUCCESS, subAudioCategory});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: SUB_AUDIO_CATEGORY_CREATE_ERROR, error});
  }
}
