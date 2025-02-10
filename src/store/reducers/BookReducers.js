import {
  BOOK_FETCH_REQUEST,
  BOOK_FETCH_SUCCESS,
  BOOK_FETCH_ERROR,
  BOOK_FETCH_BY_ID_REQUEST,
  BOOK_FETCH_BY_ID_SUCCESS,
  BOOK_FETCH_BY_ID_ERROR,
  BOOK_GET_BOOKMARK_REQUEST,
  BOOK_GET_BOOKMARK_SUCCESS,
  BOOK_GET_BOOKMARK_ERROR,
  BOOK_BOOKMARK_PAGE,
  BOOK_UN_BOOKMARK_PAGE,
  SET_BOOK_INFO,
} from '../actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BOOK_BOOKMARK} from '../../../utils/storage';
import update from 'immutability-helper';

const initialState = {
  fetching: false,
  books: [],
  error: null,
  currentBook: null,
  currentBookFetching: false,
  currentBookError: null,
  bookmarks: {},
};

const bookReducers = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_FETCH_REQUEST:
      return {...state, fetching: true, books: [], error: null};
    case BOOK_FETCH_SUCCESS:
      return {...state, fetching: false, books: action.books};
    case BOOK_FETCH_ERROR:
      return {...state, fetching: false, books: [], error: action.error};

    case BOOK_FETCH_BY_ID_REQUEST:
      return {
        ...state,
        currentBookFetching: true,
        currentBook: [],
        currentBookError: null,
      };
    case BOOK_FETCH_BY_ID_SUCCESS:
      return {...state, currentBookFetching: false, currentBook: action.book};
    case BOOK_FETCH_BY_ID_ERROR:
      return {
        ...state,
        currentBookFetching: false,
        currentBook: null,
        error: action.error,
      };
    case SET_BOOK_INFO:
      return {
        ...state,
        currentBook: action.book,
      };

    case BOOK_GET_BOOKMARK_REQUEST:
      return {
        ...state,
        bookmarks: {},
      };
    case BOOK_GET_BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmarks: action.bookmarks,
      };
    case BOOK_GET_BOOKMARK_ERROR:
      return {
        ...state,
        bookmarks: {},
      };

    case BOOK_BOOKMARK_PAGE: {
      let newBookmarks = {};

      if (!state.bookmarks?.[action.params.bookId]) {
        newBookmarks = update(state.bookmarks, {
          $merge: {
            ...state.bookmarks,
            [action.params.bookId]: [action.params.page],
          },
        });
      } else {
        newBookmarks = update(state.bookmarks, {
          [action.params.bookId]: {
            $push: [action.params.page],
          },
        });
      }

      AsyncStorage.setItem(BOOK_BOOKMARK, JSON.stringify(newBookmarks));
      return {
        ...state,
        bookmarks: newBookmarks,
      };
    }

    case BOOK_UN_BOOKMARK_PAGE: {
      const bookmarkIndex = state.bookmarks?.[action.params.bookId]?.indexOf(
        action.params.page,
      );

      const newBookmarks = update(state.bookmarks, {
        [action.params.bookId]: {
          $splice: [[bookmarkIndex, 1]],
        },
      });

      AsyncStorage.setItem(BOOK_BOOKMARK, JSON.stringify(newBookmarks));
      return {
        ...state,
        bookmarks: newBookmarks,
      };
    }

    default:
      return state;
  }
};

export default bookReducers;
