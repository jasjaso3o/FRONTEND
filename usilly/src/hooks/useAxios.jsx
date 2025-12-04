
import axios from "axios";

const url = "http://localhost:3606/api";

export function useAxios() {

  const config = {
    headers: {authorization: localStorage.getItem('token')
    }
  }

  const get = (endpoint) => {
    return axios.get(`${url}${endpoint}`, config);
  };

  const post = (endpoint, data) => {
    return axios.post(`${url}${endpoint}`, data, config);
  };

  const put = (endpoint, data) => {
    return axios.put(`${url}${endpoint}`, data, config);
  };

  const del = (endpoint) => { 
    return axios.delete(`${url}${endpoint}`, config);
  };

  return { get, post, put, del };
}
