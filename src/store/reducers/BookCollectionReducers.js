import {
  BOOK_COLLECTION_FETCH_REQUEST,
  BOOK_COLLECTION_FETCH_SUCCESS,
  BOOK_COLLECTION_FETCH_ERROR,
  BOOK_COLLECTION_FETCH_BY_ID_REQUEST,
  BOOK_COLLECTION_FETCH_BY_ID_SUCCESS,
  BOOK_COLLECTION_FETCH_BY_ID_ERROR,
  BOOK_COLLECTION_CREATE_REQUEST,
  BOOK_COLLECTION_CREATE_SUCCESS,
  BOOK_COLLECTION_CREATE_ERROR,
  SET_BOOK_COLLECTION_INFO,
} from '../actions/actionTypes';

const initialState = {
  fetching: false,
  bookCollections: [],
  error: null,
  totalBookCollections: 0,
  currentBookCollection: null,
  currentBookCollectionFetching: false,
  currentBookCollectionError: null,
  bookCollectionCreating: false,
  createdBookCollection: null,
  bookCollectionCreatingError: null,
};

const bookCollectionReducers = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_COLLECTION_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        bookCollections: state.bookCollections,
        error: null,
      };
    case BOOK_COLLECTION_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        bookCollections: action.bookCollections,
        totalBookCollections: action.totalBookCollections,
      };
    case BOOK_COLLECTION_FETCH_ERROR:
      return {
        ...state,
        fetching: false,
        bookCollections: state.bookCollections,
        error: action.error,
      };
    case BOOK_COLLECTION_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentBookCollectionFetching: true,
        currentBookCollection: state.currentBookCollection,
        currentBookCollectionError: null,
      };
    case BOOK_COLLECTION_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        currentBookCollectionFetching: false,
        currentBookCollection: action.bookCollection,
      };
    case BOOK_COLLECTION_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentBookCollectionFetching: false,
        currentBookCollection: state.currentBookCollection,
        error: action.error,
      };
    case SET_BOOK_COLLECTION_INFO:
      return {
        ...state,
        currentBookCollection: action.bookCollection,
      };

    case BOOK_COLLECTION_CREATE_REQUEST:
      return {
        ...state,
        bookCollectionCreating: true,
        createdBookCollection: null,
        bookCollectionCreatingError: null,
      };
    case BOOK_COLLECTION_CREATE_SUCCESS:
      return {
        ...state,
        bookCollectionCreating: false,
        createdBookCollection: action.bookCollection,
        bookCollectionCreatingError: null,
      };
    case BOOK_COLLECTION_CREATE_ERROR:
      return {
        ...state,
        bookCollectionCreating: false,
        createdBookCollection: null,
        bookCollectionCreatingError: action.error,
      };
    default:
      return state;
  }
};

export default bookCollectionReducers;
