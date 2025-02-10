import {get, post} from './index';

// function that makes the api request and returns a Promise for response
export const fetchAudioCategories = ({params: {itemPerPage, page}}) => {
  // return get('audio-collections?$filter=data/isCategory/iv eq true');
  return get('audio-collections');
};

export const countAudioCategories = () => {
  return get('audio-categories/count');
};

export const fetchAudioCategoryById = ({params}) => {
  console.log(`params ${params}`);
  return get(
    `audio-collections?$filter=contains(data/category/iv, '${params}')`,
  );
};

export const createAudioCategory = ({params}) => {
  return post('audio-categories', params);
};
