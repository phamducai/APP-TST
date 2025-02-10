import { get, post, del } from './index';

export const fetchPagodas = () => {
  return get('places')
}

export const fetchPagodaById = ({params}) => {
  return get(`places/${params}`)
}

export const createPagoda = ({params}) => {
  return post('places', params);
}


