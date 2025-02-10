import {get, post, del} from './index';

// function that makes the api request and returns a Promise for response
export const fetchBooks = ({params}) => {
  const {itemPerPage, page} = params;
  return get(
    `books?filter[limit]=${itemPerPage}&filter[skip]=${page * itemPerPage}`,
  );
};

export const countBooks = () => {
  return get('books/count');
};

export const deleteBookById = ({params}) => {
  return del(`books/${params}`);
};

export const fetchBookById = ({params}) => {
  return get(`books/${params}`);
};

export const createBook = ({params}) => {
  return post('books', params);
};
