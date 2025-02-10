import axios from 'axios';
import {GHOST_BASE_URL, GHOST_API_KEY} from '../../../config';
import {CMS_BASE_URL} from '../../../config';

const buidQuery = path => {
  return `${CMS_BASE_URL}/books`;
};

export const get = (path) => {
  return axios({
    method: 'GET',
    url: buidQuery(path),
  });
};

// function that makes the api request and returns a Promise for response
export const fetchBooks = () => {
  return get('posts')
}

export const fetchBookById = ({params}) => {
  return get(`posts/${params}`)
}


