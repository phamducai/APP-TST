import {
  AUDIO_CATEGORY_FETCH_REQUEST,
  AUDIO_CATEGORY_FETCH_SUCCESS,
  AUDIO_CATEGORY_FETCH_ERROR,
  AUDIO_CATEGORY_FETCH_BY_ID_REQUEST,
  AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS,
  AUDIO_CATEGORY_FETCH_BY_ID_ERROR,
  AUDIO_CATEGORY_CREATE_REQUEST,
  AUDIO_CATEGORY_CREATE_SUCCESS,
  AUDIO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  audioCategories: [],
  error: null,
  total: 0,
  currentAudio: null,
  currentAudioFetching: false,
  currentAudioError: null,
  audioCategoryCreating: false,
  createdAudio: null,
  audioCategoryCreatingError: null,
  audioCollectionFetching: false,
  audioCollections: [],
  audioCollectionError: null,
  totalCollections: 0,
};

const audioCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_CATEGORY_FETCH_REQUEST: {
      console.log(state.audioCategories);
      return {
        ...state,
        fetching: true,
        //  audioCategories: [],
        error: null,
      };
    }
    case AUDIO_CATEGORY_FETCH_SUCCESS: {
      return {
        ...state,
        fetching: false,
        audioCategories: action.audioCategories,
        total: action.total,
      };
    }
    case AUDIO_CATEGORY_FETCH_ERROR: {
      console.log(state.audioCategories);
      return {
        ...state,
        fetching: false,
        // audioCategories: [],
        error: action.error,
      };
    }
    case AUDIO_CATEGORY_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        audioCollectionFetching: true,
        audioCollections: [],
        audioCollectionError: null,
        totalCollections: 0,
      };
    case AUDIO_CATEGORY_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        audioCollectionFetching: false,
        audioCollections: action.audioCategory,
        totalCollections: action.totalCollections,
        audioCollectionError: null,
      };
    case AUDIO_CATEGORY_FETCH_BY_ID_ERROR:
      return {
        ...state,
        audioCollectionFetching: false,
        audioCollections: null,
        audioCollectionError: action.error,
      };
    case AUDIO_CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        audioCategoryCreating: true,
        createdAudio: null,
        audioCategoryCreatingError: null,
      };
    case AUDIO_CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        audioCategoryCreating: false,
        createdAudio: action.audioCategory,
        audioCategoryCreatingError: null,
      };
    case AUDIO_CATEGORY_CREATE_ERROR:
      return {
        ...state,
        audioCategoryCreating: false,
        createdAudio: null,
        audioCategoryCreatingError: action.error,
      };
    default:
      return state;
  }
};

export default audioCategoryReducers;
