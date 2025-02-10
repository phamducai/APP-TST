import {PLAY_REQUEST, PLAY_SUCCESS, PLAY_ERROR} from '../actions/actionTypes';

const initialState = {
  player: null,
};

const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_REQUEST:
      return state;
    case PLAY_SUCCESS:
      return {...state, player: action.player};
    case PLAY_ERROR:
      return state;

    default:
      return state;
  }
};

export default videoReducers;
