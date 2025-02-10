import { get, post, del } from './index';

// function that makes the api request and returns a Promise for response
export const fetchSubAudioCategories = ({params: {itemPerPage, page}}) => {
  return get(`sub-audio-categories?filter[limit]=${itemPerPage}&filter[skip]=${page * itemPerPage}`)
}

export const countSubAudioCategories = () => {
  return get('sub-audio-categories/count')
}

export const fetchSubAudioCategoryById = ({params}) => {
  return get(`sub-audio-categories/${params}`)
}

export const createSubAudioCategory = ({params}) => {
  return post('sub-audio-categories', params);
}


