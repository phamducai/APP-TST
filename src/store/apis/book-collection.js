import {get, post, del} from './index';

// function that makes the api request and returns a Promise for response
export const fetchBookCollections = ({params}) => {
  const {itemPerPage, page} = params;

  // return get('books?$filter=data/includedInCollection/iv eq false');
  return get('books');
};

export const countBookCollections = () => {
  return get('book-collections/count');
};

export const fetchBookCollectionById = ({params}) => {
  return get(`books?$filter=contains(data/collection/iv, '${params}')`);
};

export const createBookCollection = ({params}) => {
  return post('book-collections', params);
};
