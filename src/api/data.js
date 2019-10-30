import axios from "./index";

export const getTableData = () => {
  return axios.request({
    url: '/getTableData',
    method: 'GET'
  })
};

export const getFolderList = () => {
  return axios.request(({
    url: '/getFolderList',
    method: 'GET'
  }))
};

export const getFileList = () => {
  return axios.request(({
    url: '/getFileList',
    method: 'GET'
  }))
};

export const deleteFile = (id, type) => {
  return axios.request({
    url: '/deleteFile',
    method: 'POST',
    data: {
      type,
      id
    }
  })
};

export const getFilesList = () => {
  return axios.request({
    url: 'file/get_file_list',
    method: 'GET',
    params: {
      userId: '1'
    }
  })
};

export const getFile = (key, type) => {
  return axios.request({
    url: 'file/get_file',
    method: 'POST',
    data: {
      key,
      type
    }
  });
};

export const delFile = (key) => {
  return axios.request({
    url: 'file/delete_file',
    method: 'DELETE',
    data: {
      key,
    }
  })
};

export const sendFormData = ({url, data}) => {
  return axios.request({
    url: url,
    method: 'POST',
    data
  })
};
