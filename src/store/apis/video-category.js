import { get, post, del } from './index';

// function that makes the api request and returns a Promise for response
export const fetchVideoCategories = ({ params: { itemPerPage, page } }) => {
  return get(`video-collections/?$skip=${itemPerPage*page}&$top=${itemPerPage}`);
};

export const countVideoCategories = () => {
  return get('video-collections/count');
};

export const fetchVideoCategoryById = ({ params }) => {
  return get(`video-collections/${params}`);
};

export const createVideoCategory = ({ params }) => {
  return post('video-collections', params);
};
