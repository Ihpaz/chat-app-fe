"use strict";

import axios from "axios";


let config = {
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.apiUrl || "http:/localhost:8000/api"
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);



export default _axios;
