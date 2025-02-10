import {
  AUDIO_FETCH_REQUEST,
  AUDIO_FETCH_SUCCESS,
  AUDIO_FETCH_ERROR,
  AUDIO_FETCH_BY_ID_REQUEST,
  AUDIO_FETCH_BY_ID_SUCCESS,
  AUDIO_FETCH_BY_ID_ERROR,
  AUDIO_CREATE_REQUEST,
  AUDIO_CREATE_SUCCESS,
  AUDIO_CREATE_ERROR,
  AUDIO_DELETE_ERROR,
  AUDIO_DELETE_REQUEST,
  AUDIO_DELETE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  audios: [],
  error: null,
  totalAudios: 0,
  currentAudio: null,
  currentAudioFetching: false,
  currentAudioError: null,
  audioCreating: false,
  createdAudio: null,
  audioCreatingError: null,
  deleting: false,
  deleteError: null,
};

const audioReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_FETCH_REQUEST:
      return {...state, fetching: true, audios: [], error: null};
    case AUDIO_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        audios: action.audios,
        totalAudios: action.totalAudios,
      };
    case AUDIO_FETCH_ERROR:
      return {...state, fetching: false, audios: [], error: action.error};
    case AUDIO_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentAudioFetching: true,
        currentAudio: [],
        currentAudioError: null,
      };
    case AUDIO_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        currentAudioFetching: false,
        currentAudio: action.audio,
      };
    case AUDIO_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentAudioFetching: false,
        currentAudio: null,
        error: action.error,
      };
    case AUDIO_CREATE_REQUEST:
      return {
        ...state,
        audioCreating: true,
        createdAudio: null,
        audioCreatingError: null,
      };
    case AUDIO_CREATE_SUCCESS:
      return {
        ...state,
        audioCreating: false,
        createdAudio: action.audio,
        audioCreatingError: null,
      };
    case AUDIO_CREATE_ERROR:
      return {
        ...state,
        audioCreating: false,
        createdAudio: null,
        audioCreatingError: action.error,
      };
    case AUDIO_DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
        deleteError: null,
      };
    case AUDIO_DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleteError: null,
      };
    case AUDIO_DELETE_ERROR:
      return {
        ...state,
        deleting: false,
        deleteError: action.error,
      };
    default:
      return state;
  }
};

export default audioReducers;
