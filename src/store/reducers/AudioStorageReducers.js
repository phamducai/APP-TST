import {SAVE_AUDIO} from '../actions/actionTypes';

const initialState = {
  audios: [],
};

const audioStorageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_AUDIO: {
      return {
        ...state,
        audios: [...state.audios, action.item],
      };
    }

    default:
      return state;
  }
};

export default audioStorageReducers;
