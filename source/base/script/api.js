import axios from 'axios';

export default class api {
  static post(url, data = {}) {
    return axios.post(url, data);
  }

  static get(url, data = {}) {
    return axios.get(url, {
      params: data,
    });
  }
}
