import axios from 'axios';
import {API_BASE_URL} from './config';

const buidQuery = path => {
  return `${API_BASE_URL}/${path}`;
};

export const get = path => {
  return axios({
    method: 'GET',
    url: buidQuery(path),
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBadTVmb25LNXYxbXYtYWNYeFFFQ3ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MjUyOTgxMDksImV4cCI6MTYyNzg5MDEwOSwiaXNzIjoiaHR0cHM6Ly9zcXVpZGV4LXRpZW50bi5kZG5zLm5ldC9pZGVudGl0eS1zZXJ2ZXIiLCJjbGllbnRfaWQiOiJ0b3N1dGhpZW46YXBwIiwianRpIjoiOUVCODVBNkVGRUNEMTQ0MDNEQTEzRkM3Mjg5NUY1RjUiLCJpYXQiOjE2MjUyOTgxMDksInNjb3BlIjpbInNxdWlkZXgtYXBpIl19.A1S0AZmJGryIRIq5-x1h51OKLq20zZLpc5nUY424x0ZrtQjq66bGx8KfX5t4YKr2fz-NsgbokWNUDAJF0rKZ4NhaPvB85jraiC0R8fnP3tMZ8Iw-NYkW7seoBEQbZfn_G7GM5nmyICwhyZVFUqar_tEA_PhsWXzSS-Bkee8M0mdFI-zqFG4x5N9fDypGk9X9VPpop_q74LG7NbRQpAgdnTNXNkPb9yrsJfm3Ts9JBqfJcOmsXDu0bZbPT3Q1mh7FnHLVR6k2oUsL-TKUFAKXKccnKXPDp5tgNyk-1CX6dVxmaX17qRr4Gk-gNFLm8yC6JLGEjO7h9pNFGY1oifUFow',
      'X-Flatten': true,
    },
  });
};

export const del = path => {
  return axios({
    method: 'DELETE',
    url: buidQuery(path),
  });
};

export const post = (path, params) => {
  return axios({
    method: 'POST',
    url: buidQuery(path),
    data: params,
  });
};
