import { get, post, del } from './index';

// function that makes the api request and returns a Promise for response
export const fetchVideos = ({ params: { itemPerPage, page } }) => {
  return get(`videos?filter[limit]=${itemPerPage}&filter[skip]=${itemPerPage * page}`);
};

export const countVideos = () => {
  return get('videos/count');
};

export const fetchVideoById = ({ params }) => {
  return get(`videos/${params}`);
};

export const createVideo = ({ params }) => {
  return post('videos', params);
};
