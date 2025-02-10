import {call, put} from 'redux-saga/effects';
import {PLAY_ERROR, PLAY_SUCCESS} from '../actions/actionTypes';

export function* playSaga({params: player}) {
  try {
    // dispatch a success action to the store with the new dog
    yield put({type: PLAY_SUCCESS, player});
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({type: PLAY_ERROR, error});
  }
}
