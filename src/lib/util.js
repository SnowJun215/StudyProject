import Cookies from 'js-cookie';
import clonedeep from 'clonedeep';
import {deepCopy} from "iview/src/utils/assist";

export const setTitle = (title) => {
  window.document.title = title || 'admin';
};

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token);
};

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName);
};

export const putFileInFolder = (folderList, fileList) => {
  const folderListCloned = clonedeep(folderList);
  const fileListCloned = clonedeep(fileList);
  folderListCloned.map(folder => {
    const folderId = folder.id;
    let index = fileListCloned.length;
    while (--index >= 0) {
      let fileItem = fileListCloned[index];
      if (fileItem.folder_id === folderId) {
        const file = fileListCloned.splice(index, 1)[0];
        file.title = file.name;
        if (!folder.children ){
          folder.children = [];
        }
        folder.children.push(file);
      }
    }
    folder.type = 'folder';
    folder.title = folder.name;
    return folder;
  });
  return folderListCloned;
};

export const transferFolderListToTree = folderList => {
  if (!folderList.length) {
    return [];
  }
  const folderListCloned = deepCopy(folderList);
  const handle = id => {
    let arr = [];
    folderListCloned.forEach(folder => {
      if (folder.folder_id === id) {
        const children = handle(folder.id);
        if (folder.children) {
          folder.children = [].concat(folder.children, children);
        } else {
          folder.children = children;
        }
        arr.push(folder);
      }
    });
    return arr;
  };
  return handle(0);
};

export const expandSpecifiedFolder = (folderTree, id) => {
  return folderTree.map(item => {
    if (item.type === 'folder' && item.id === id) {
      item.expand = true;
    } else if(item.children && item.children.length) {
      item.children = expandSpecifiedFolder(item.children, id);
      if (item.children.some(child => {
        return child.expand === true;
      })) {
        item.expand = true;
      }
    }
    return item;
  })
};


export const downloadFile = ({url, params}) => {
  const form = document.createElement('form');
  form.setAttribute('action', url);
  form.setAttribute('method', 'post');
  for (const key in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', params[key]);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
