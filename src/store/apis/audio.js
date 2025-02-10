import {get, post, del} from './index';

// function that makes the api request and returns a Promise for response
export const fetchAudios = ({params: {itemPerPage, page}}) => {
  return get(
    `audio?filter[limit]=${itemPerPage}&filter[skip]=${page * itemPerPage}`,
  );
};

export const countAudios = () => {
  return get('audio/count');
};

export const deleteAudioById = ({params}) => {
  return del(`audio/${params}`);
};

export const fetchAudioById = ({params}) => {
  return get(`audio/${params}`);
};

export const createAudio = ({params}) => {
  return post('audio', params);
};
