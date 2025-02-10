import {takeLatest} from 'redux-saga/effects';
import {
  BOOK_FETCH_REQUEST,
  BOOK_FETCH_BY_ID_REQUEST,
  BOOK_COLLECTION_FETCH_REQUEST,
  BOOK_COLLECTION_FETCH_BY_ID_REQUEST,
  BOOK_COLLECTION_CREATE_REQUEST,
  PAGODA_FETCH_REQUEST,
  PAGODA_FETCH_BY_ID_REQUEST,
  PAGODA_CREATE_REQUEST,
  AUDIO_FETCH_REQUEST,
  AUDIO_FETCH_BY_ID_REQUEST,
  AUDIO_CREATE_REQUEST,
  AUDIO_DELETE_REQUEST,
  AUDIO_CATEGORY_CREATE_REQUEST,
  AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  AUDIO_CATEGORY_FETCH_REQUEST,
  SUB_AUDIO_CATEGORY_CREATE_REQUEST,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  SUB_AUDIO_CATEGORY_FETCH_REQUEST,
  VIDEO_FETCH_REQUEST,
  VIDEO_FETCH_BY_ID_REQUEST,
  VIDEO_CREATE_REQUEST,
  VIDEO_CATEGORY_CREATE_REQUEST,
  VIDEO_CATEGORY_FETCH_BY_ID_REQUEST,
  VIDEO_CATEGORY_FETCH_REQUEST,
  PLAY_REQUEST,
  BOOK_GET_BOOKMARK_REQUEST,
} from '../actions/actionTypes';

import {fetchBooksSaga, fetchBookByIdSaga, getBookmarksSage} from './bookSagas';
import {
  fetchBookCollectionsSaga,
  fetchBookCollectionByIdSaga,
  createBookCollectionSaga,
} from './bookCollectionSagas';
import {
  fetchPagodasSaga,
  fetchPagodaByIdSaga,
  createPagodaSaga,
} from './pagodaSagas';
import {
  fetchAudiosSaga,
  fetchAudioByIdSaga,
  createAudioSaga,
  deleteAudioSaga,
} from './audioSagas';
import {
  fetchAudioCategoriesSaga,
  fetchAudioCategoryByIdSaga,
  createAudioCategorySaga,
} from './audioCategorySagas';
import {
  fetchSubAudioCategoriesSaga,
  fetchSubAudioCategoryByIdSaga,
  createSubAudioCategorySaga,
} from './subAudioCategorySagas';

import {
  fetchVideosSaga,
  fetchVideoByIdSaga,
  createVideoSaga,
} from './videoSagas';
import {
  fetchVideoCategoriesSaga,
  fetchVideoCategoryByIdSaga,
  createVideoCategorySaga,
} from './videoCategorySagas';

import {playSaga} from './playerSaga';

export default function* rootSaga() {
  //Book
  yield takeLatest(BOOK_FETCH_REQUEST, fetchBooksSaga);
  yield takeLatest(BOOK_FETCH_BY_ID_REQUEST, fetchBookByIdSaga);
  yield takeLatest(BOOK_GET_BOOKMARK_REQUEST, getBookmarksSage);

  // Book Collection
  yield takeLatest(BOOK_COLLECTION_FETCH_REQUEST, fetchBookCollectionsSaga);
  yield takeLatest(
    BOOK_COLLECTION_FETCH_BY_ID_REQUEST,
    fetchBookCollectionByIdSaga,
  );
  yield takeLatest(BOOK_COLLECTION_CREATE_REQUEST, createBookCollectionSaga);

  // Pagoda
  yield takeLatest(PAGODA_FETCH_REQUEST, fetchPagodasSaga);
  yield takeLatest(PAGODA_FETCH_BY_ID_REQUEST, fetchPagodaByIdSaga);
  yield takeLatest(PAGODA_CREATE_REQUEST, createPagodaSaga);

  // Audio
  yield takeLatest(AUDIO_FETCH_REQUEST, fetchAudiosSaga);
  yield takeLatest(AUDIO_FETCH_BY_ID_REQUEST, fetchAudioByIdSaga);
  yield takeLatest(AUDIO_CREATE_REQUEST, createAudioSaga);
  yield takeLatest(AUDIO_DELETE_REQUEST, deleteAudioSaga);

  // Audio Category
  yield takeLatest(AUDIO_CATEGORY_FETCH_REQUEST, fetchAudioCategoriesSaga);
  yield takeLatest(
    AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
    fetchAudioCategoryByIdSaga,
  );
  yield takeLatest(AUDIO_CATEGORY_CREATE_REQUEST, createAudioCategorySaga);

  // SUB Audio Category
  yield takeLatest(
    SUB_AUDIO_CATEGORY_FETCH_REQUEST,
    fetchSubAudioCategoriesSaga,
  );
  yield takeLatest(
    SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
    fetchSubAudioCategoryByIdSaga,
  );
  yield takeLatest(
    SUB_AUDIO_CATEGORY_CREATE_REQUEST,
    createSubAudioCategorySaga,
  );

  // Video
  yield takeLatest(VIDEO_FETCH_REQUEST, fetchVideosSaga);
  yield takeLatest(VIDEO_FETCH_BY_ID_REQUEST, fetchVideoByIdSaga);
  yield takeLatest(VIDEO_CREATE_REQUEST, createVideoSaga);

  // Video Category
  yield takeLatest(VIDEO_CATEGORY_FETCH_REQUEST, fetchVideoCategoriesSaga);
  yield takeLatest(
    VIDEO_CATEGORY_FETCH_BY_ID_REQUEST,
    fetchVideoCategoryByIdSaga,
  );
  yield takeLatest(VIDEO_CATEGORY_CREATE_REQUEST, createVideoCategorySaga);

  yield takeLatest(PLAY_REQUEST, playSaga);
}
