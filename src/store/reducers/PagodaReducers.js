import {
  PAGODA_FETCH_REQUEST,
  PAGODA_FETCH_SUCCESS,
  PAGODA_FETCH_ERROR,
  PAGODA_FETCH_BY_ID_REQUEST,
  PAGODA_FETCH_BY_ID_SUCCESS,
  PAGODA_FETCH_BY_ID_ERROR,
  PAGODA_CREATE_REQUEST,
  PAGODA_CREATE_SUCCESS,
  PAGODA_CREATE_ERROR,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  pagodas: [],
  error: null,
  currentPagoda: null,
  currentPagodaFetching: false,
  currentPagodaError: null,
  pagodaCreating: false,
  createdPagoda: null,
  pagodaCreatingError: null
};

const pagodaReducers = (state = initialState, action) => {
  switch (action.type) {
    case PAGODA_FETCH_REQUEST:
      return { ...state, fetching: true, pagodas: [], error: null };
    case PAGODA_FETCH_SUCCESS:
      return { ...state, fetching: false, pagodas: action.pagodas };
    case PAGODA_FETCH_ERROR:
      return { ...state, fetching: false, pagodas: [], error: action.error };
    case PAGODA_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentPagodaFetching: true,
        currentPagoda: [],
        currentPagodaError: null,
      };
    case PAGODA_FETCH_BY_ID_SUCCESS:
      return { ...state, currentPagodaFetching: false, currentPagoda: action.pagoda };
    case PAGODA_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentPagodaFetching: false,
        currentPagoda: null,
        error: action.error,
      };
    case PAGODA_CREATE_REQUEST:
      return {
        ...state,
        pagodaCreating: true,
        createdPagoda: null,
        pagodaCreatingError: null
      }
    case PAGODA_CREATE_SUCCESS:
      return {
        ...state,
        pagodaCreating: false,
        createdPagoda: action.pagoda,
        pagodaCreatingError: null
      }
    case PAGODA_CREATE_ERROR:
      return {
        ...state,
        pagodaCreating: false,
        createdPagoda: null,
        pagodaCreatingError: action.error
      }
    default:
      return state;
  }
};

export default pagodaReducers;
