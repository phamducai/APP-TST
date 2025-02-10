import {
  INCREMENT,
  DECREMENT,

  // Book
  BOOK_FETCH_REQUEST,
  BOOK_FETCH_BY_ID_REQUEST,
  BOOK_CREATE_REQUEST,
  BOOK_DELETE_REQUEST,
  SET_BOOK_INFO,

  // Book Collection
  BOOK_COLLECTION_FETCH_REQUEST,
  BOOK_COLLECTION_FETCH_BY_ID_REQUEST,
  BOOK_COLLECTION_CREATE_REQUEST,
  SET_BOOK_COLLECTION_INFO,

  // Pagoda
  PAGODA_FETCH_REQUEST,
  PAGODA_FETCH_BY_ID_REQUEST,
  PAGODA_CREATE_REQUEST,
  // Audio
  AUDIO_FETCH_REQUEST,
  AUDIO_FETCH_BY_ID_REQUEST,
  AUDIO_CREATE_REQUEST,
  AUDIO_DELETE_REQUEST,

  // Audio Category
  AUDIO_CATEGORY_FETCH_REQUEST,
  AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  AUDIO_CATEGORY_CREATE_REQUEST,

  //Sub Audio Category
  SUB_AUDIO_CATEGORY_FETCH_REQUEST,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  SUB_AUDIO_CATEGORY_CREATE_REQUEST,
  // Video
  VIDEO_FETCH_REQUEST,
  VIDEO_FETCH_BY_ID_REQUEST,
  VIDEO_CREATE_REQUEST,

  // Video Category
  VIDEO_CATEGORY_FETCH_REQUEST,
  VIDEO_CATEGORY_FETCH_BY_ID_REQUEST,
  VIDEO_CATEGORY_CREATE_REQUEST,
  // Player
  PLAY_REQUEST,

  // Bookmark
  BOOK_BOOKMARK_PAGE,
  BOOK_UN_BOOKMARK_PAGE,
  BOOK_GET_BOOKMARK_REQUEST,
  SAVE_AUDIO,
  SAVE_BOOK,
  SET_AUDIO_CATEGORY,
} from './actionTypes';

// Tăng với giá trị step
export const increaseAction = step => {
  return {
    type: INCREMENT,
    step: step,
  };
};

// Giảm với giá trị step
export const decreaseAction = step => {
  return {
    type: DECREMENT,
    step: step,
  };
};

export const fetchBooksAction = params => {
  return {
    type: BOOK_FETCH_REQUEST,
    params: params,
  };
};

export const fetchBookByIdAction = id => {
  return {
    type: BOOK_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const getBookMarksAction = params => {
  return {
    type: BOOK_GET_BOOKMARK_REQUEST,
    params,
  };
};

export const createBookAction = params => {
  return {
    type: BOOK_CREATE_REQUEST,
    params: params,
  };
};

export const deleteBookAction = params => {
  return {
    type: BOOK_DELETE_REQUEST,
    params: params,
  };
};

export const bookmarkPageAction = params => {
  return {
    type: BOOK_BOOKMARK_PAGE,
    params,
  };
};

export const unBookmarkPageAction = params => {
  return {
    type: BOOK_UN_BOOKMARK_PAGE,
    params,
  };
};

export const fetchBookCollectionsAction = params => {
  return {
    type: BOOK_COLLECTION_FETCH_REQUEST,
    params: params,
  };
};

export const fetchBookCollectionByIdAction = id => {
  return {
    type: BOOK_COLLECTION_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const setBookCollectionInfoAction = params => {
  return {
    type: SET_BOOK_COLLECTION_INFO,
    bookCollection: params,
  };
};

export const createBookCollectionAction = params => {
  return {
    type: BOOK_COLLECTION_CREATE_REQUEST,
    params: params,
  };
};

export const fetchPagodasAction = params => {
  return {
    type: PAGODA_FETCH_REQUEST,
    params,
  };
};

export const fetchPagodaByIdAction = id => {
  return {
    type: PAGODA_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const createPagodaAction = params => {
  return {
    type: PAGODA_CREATE_REQUEST,
    params: params,
  };
};

export const fetchAudiosAction = params => {
  return {
    type: AUDIO_FETCH_REQUEST,
    params,
  };
};

export const fetchAudioByIdAction = id => {
  return {
    type: AUDIO_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const createAudioAction = params => {
  return {
    type: AUDIO_CREATE_REQUEST,
    params: params,
  };
};

export const deleteAudioByIdAction = params => {
  return {
    type: AUDIO_DELETE_REQUEST,
    params: params,
  };
};

export const fetchAudioCategoriesAction = params => {
  return {
    type: AUDIO_CATEGORY_FETCH_REQUEST,
    params,
  };
};

export const fetchAudioCategorieByIdAction = id => {
  return {
    type: AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const setAudioCategoryAction = params => {
  return {
    type: SET_AUDIO_CATEGORY,
    audioCollections: params,
  };
};

export const createAudioCategoryAction = params => {
  return {
    type: AUDIO_CATEGORY_CREATE_REQUEST,
    params: params,
  };
};

export const fetchSubAudioCategoriesAction = params => {
  return {
    type: SUB_AUDIO_CATEGORY_FETCH_REQUEST,
    params,
  };
};

export const fetchSubAudioCategorieByIdAction = id => {
  return {
    type: SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const createSubAudioCategoryAction = params => {
  return {
    type: SUB_AUDIO_CATEGORY_CREATE_REQUEST,
    params: params,
  };
};

export const fetchVideosAction = params => {
  return {
    type: VIDEO_FETCH_REQUEST,
    params,
  };
};

export const fetchVideoByIdAction = id => {
  return {
    type: VIDEO_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const createVideoAction = params => {
  return {
    type: VIDEO_CREATE_REQUEST,
    params: params,
  };
};

export const fetchVideoCategoriesAction = params => {
  return {
    type: VIDEO_CATEGORY_FETCH_REQUEST,
    params,
  };
};

export const fetchVideoCategorieByIdAction = id => {
  return {
    type: VIDEO_CATEGORY_FETCH_BY_ID_REQUEST,
    params: id,
  };
};

export const createVideoCategoryAction = params => {
  return {
    type: VIDEO_CATEGORY_CREATE_REQUEST,
    params: params,
  };
};

export const playAction = params => {
  return {
    type: PLAY_REQUEST,
    params: params,
  };
};

export const saveAudio = params => {
  return {
    type: SAVE_AUDIO,
    params: params,
  };
};

export const saveBook = params => {
  return {
    type: SAVE_BOOK,
    params: params,
  };
};

export const setBookInfoAction = params => {
  return {
    type: SET_BOOK_INFO,
    book: params,
  };
};
