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
