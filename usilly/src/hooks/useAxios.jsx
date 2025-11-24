
import axios from "axios";

const API_URL = "http://localhost:3606/api";

export function useAxios() {

  const get = (endpoint, config = {}) => {
    return axios.get(`${API_URL}${endpoint}`, config);
  };

  const post = (endpoint, data, config = {}) => {
    return axios.post(`${API_URL}${endpoint}`, data, config);
  };

  const put = (endpoint, data, config = {}) => {
    return axios.put(`${API_URL}${endpoint}`, data, config);
  };

  const del = (endpoint, config = {}) => { 
    return axios.delete(`${API_URL}${endpoint}`, config);
  };

  return { get, post, put, del };
}
