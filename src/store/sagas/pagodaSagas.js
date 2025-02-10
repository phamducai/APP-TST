import { call, put } from 'redux-saga/effects';
import {
  PAGODA_FETCH_SUCCESS,
  PAGODA_FETCH_ERROR,
  PAGODA_FETCH_BY_ID_SUCCESS,
  PAGODA_FETCH_BY_ID_ERROR,
  PAGODA_CREATE_SUCCESS,
  PAGODA_CREATE_ERROR
} from '../actions/actionTypes';
import { fetchPagodas, fetchPagodaById, createPagoda } from '../apis/pagoda';

export function* fetchPagodasSaga() {
  try {
    const response = yield call(fetchPagodas);
    const pagodas = response.data.items;
    // dispatch a success action to the store with the new dog
    yield put({ type: PAGODA_FETCH_SUCCESS, pagodas });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: PAGODA_FETCH_ERROR, error });
  }
}

export function* fetchPagodaByIdSaga(params) {
  try {
    const response = yield call(fetchPagodaById, params);
    const pagoda = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: PAGODA_FETCH_BY_ID_SUCCESS, pagoda });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: PAGODA_FETCH_BY_ID_ERROR, error });
  }
}

export function* createPagodaSaga(params) {
  try {
    const response = yield call(createPagoda, params);
    const pagoda = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: PAGODA_CREATE_SUCCESS, pagoda });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: PAGODA_CREATE_ERROR, error });
  }
}
