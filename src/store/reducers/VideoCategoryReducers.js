import {
  VIDEO_CATEGORY_FETCH_REQUEST,
  VIDEO_CATEGORY_FETCH_SUCCESS,
  VIDEO_CATEGORY_FETCH_ERROR,
  VIDEO_CATEGORY_FETCH_BY_ID_REQUEST,
  VIDEO_CATEGORY_FETCH_BY_ID_SUCCESS,
  VIDEO_CATEGORY_FETCH_BY_ID_ERROR,
  VIDEO_CATEGORY_CREATE_REQUEST,
  VIDEO_CATEGORY_CREATE_SUCCESS,
  VIDEO_CATEGORY_CREATE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  videoCategories: [],
  error: null,
  total: 0,
  currentVideo: null,
  currentVideoFetching: false,
  currentVideoError: null,
  videoCategoryCreating: false,
  createdVideo: null,
  videoCategoryCreatingError: null
};

const videoCategoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_CATEGORY_FETCH_REQUEST:
      return { ...state, fetching: true, videoCategories: [], error: null };
    case VIDEO_CATEGORY_FETCH_SUCCESS:
      return { ...state, fetching: false, videoCategories: action.videoCategories, total: action.total };
    case VIDEO_CATEGORY_FETCH_ERROR:
      return { ...state, fetching: false, videoCategories: [], error: action.error };
    case VIDEO_CATEGORY_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentVideoFetching: true,
        currentVideo: [],
        currentVideoError: null,
      };
    case VIDEO_CATEGORY_FETCH_BY_ID_SUCCESS:
      return { ...state, currentVideoFetching: false, currentVideo: action.videoCategory };
    case VIDEO_CATEGORY_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentVideoFetching: false,
        currentVideo: null,
        error: action.error,
      };
    case VIDEO_CATEGORY_CREATE_REQUEST:
      return {
        ...state,
        videoCategoryCreating: true,
        createdVideo: null,
        videoCategoryCreatingError: null
      }
    case VIDEO_CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        videoCategoryCreating: false,
        createdVideo: action.videoCategory,
        videoCategoryCreatingError: null
      }
    case VIDEO_CATEGORY_CREATE_ERROR:
      return {
        ...state,
        videoCategoryCreating: false,
        createdVideo: null,
        videoCategoryCreatingError: action.error
      }
    default:
      return state;
  }
};

export default videoCategoryReducers;
