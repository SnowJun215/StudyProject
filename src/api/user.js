import axios from "./index";

export const getUserInfo = ({userId}) => {
  return axios.request({
    url: '/getUserInfo',
    method: 'POST',
    data: {
      userId
    }
  })
};

export const login = ({userName, password}) => {
  return axios.request({
    url: '/index/login',
    method: 'POST',
    data: {
      userName, password
    }
  })
};

export const authorization = () => {
  return axios.request({
    url: '/user/authorization',
    method: 'GET'
  })
};
