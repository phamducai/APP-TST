import {
  VIDEO_FETCH_REQUEST,
  VIDEO_FETCH_SUCCESS,
  VIDEO_FETCH_ERROR,
  VIDEO_FETCH_BY_ID_REQUEST,
  VIDEO_FETCH_BY_ID_SUCCESS,
  VIDEO_FETCH_BY_ID_ERROR,
  VIDEO_CREATE_REQUEST,
  VIDEO_CREATE_SUCCESS,
  VIDEO_CREATE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  videos: [],
  error: null,
  total: 0,
  currentVideo: null,
  currentVideoFetching: false,
  currentVideoError: null,
  videoCreating: false,
  createdVideo: null,
  videoCreatingError: null
};

const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_FETCH_REQUEST:
      return { ...state, fetching: true, videos: [], error: null };
    case VIDEO_FETCH_SUCCESS:
      return { ...state, fetching: false, videos: action.videos, total: action.total };
    case VIDEO_FETCH_ERROR:
      return { ...state, fetching: false, videos: [], error: action.error };
    case VIDEO_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentVideoFetching: true,
        currentVideo: [],
        currentVideoError: null,
      };
    case VIDEO_FETCH_BY_ID_SUCCESS:
      return { ...state, currentVideoFetching: false, currentVideo: action.video };
    case VIDEO_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentVideoFetching: false,
        currentVideo: null,
        error: action.error,
      };
    case VIDEO_CREATE_REQUEST:
      return {
        ...state,
        videoCreating: true,
        createdVideo: null,
        videoCreatingError: null
      }
    case VIDEO_CREATE_SUCCESS:
      return {
        ...state,
        videoCreating: false,
        createdVideo: action.video,
        videoCreatingError: null
      }
    case VIDEO_CREATE_ERROR:
      return {
        ...state,
        videoCreating: false,
        createdVideo: null,
        videoCreatingError: action.error
      }
    default:
      return state;
  }
};

export default videoReducers;
