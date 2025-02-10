import {
  SUB_AUDIO_CATEGORY_FETCH_REQUEST,
  SUB_AUDIO_CATEGORY_FETCH_SUCCESS,
  SUB_AUDIO_CATEGORY_FETCH_ERROR,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS,
  SUB_AUDIO_CATEGORY_FETCH_BY_ID_ERROR,
  SUB_AUDIO_CATEGORY_CREATE_REQUEST,
  SUB_AUDIO_CATEGORY_CREATE_SUCCESS,
  SUB_AUDIO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  subAudioCategories: [],
  error: null,
  total: 0,
  currentAudioCollection: null,
  currentAudioCollectionFetching: false,
  currentAudioCollectionError: null,
  subAudioCategoryCreating: false,
  createdAudioCollection: null,
  subAudioCategoryCreatingError: null,
};

const subAudioCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case SUB_AUDIO_CATEGORY_FETCH_REQUEST:
      return {...state, fetching: true, subAudioCategories: [], error: null};
    case SUB_AUDIO_CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        subAudioCategories: action.subAudioCategories,
        total: action.total,
      };
    case SUB_AUDIO_CATEGORY_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        subAudioCategories: [],
        error: action.error,
      };
    case SUB_AUDIO_CATEGORY_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentBookFetching: true,
        currentAudioCollection: null,
        currentAudioCollectionError: null,
      };
    case SUB_AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        currentAudioCollectionFetching: false,
        currentAudioCollection: action.subAudioCategory,
      };
    case SUB_AUDIO_CATEGORY_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentAudioCollectionFetching: false,
        currentAudioCollection: null,
        currentAudioCollectionError: action.error,
      };
    case SUB_AUDIO_CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        subAudioCategoryCreating: true,
        createdBook: null,
        subAudioCategoryCreatingError: null,
      };
    case SUB_AUDIO_CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        subAudioCategoryCreating: false,
        createdBook: action.subAudioCategory,
        subAudioCategoryCreatingError: null,
      };
    case SUB_AUDIO_CATEGORY_CREATE_ERROR:
      return {
        ...state,
        subAudioCategoryCreating: false,
        createdBook: null,
        subAudioCategoryCreatingError: action.error,
      };
    default:
      return state;
  }
};

export default subAudioCategoryReducers;
