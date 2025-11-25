
import axios from "axios";

const url = "http://localhost:3606/api";

export function useAxios() {

  const get = (endpoint, config = {}) => {
    return axios.get(`${url}${endpoint}`, config);
  };

  const post = (endpoint, data, config = {}) => {
    return axios.post(`${url}${endpoint}`, data, config);
  };

  const put = (endpoint, data, config = {}) => {
    return axios.put(`${url}${endpoint}`, data, config);
  };

  const del = (endpoint, config = {}) => { 
    return axios.delete(`${url}${endpoint}`, config);
  };

  return { get, post, put, del };
}
