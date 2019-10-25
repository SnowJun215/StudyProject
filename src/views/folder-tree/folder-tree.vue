<template>
  <div class="folder-wrapper">
<!--    <Tree :data="folderTree" :render="renderFunc"></Tree>-->
    <folder-tree
      :folder-list.sync="folderList"
      :file-list.sync="fileList"
      :folder-drop="folderDrop"
      :file-drop="fileDrop"
      :before-delete="beforeDelete" />
  </div>
</template>

<script>
  import {getFileList, getFolderList, deleteFile} from "@/api/data";
  import FolderTree from '_c/folder-tree';

  export default {
    name: "folder-tree-view",
    data () {
      return {
        folderList: [],
        fileList: [],
        folderDrop: [
          {
            name: 'rename',
            title: '重命名'
          },
          {
            name: 'delete',
            title: '删除文件夹'
          }
        ],
        fileDrop: [
          {
            name: 'rename',
            title: '重命名'
          },
          {
            name: 'delete',
            title: '删除文件'
          }
        ]
      }
    },
    components: {
      FolderTree
    },
    methods: {
      beforeDelete () {
        return new Promise((resolve, reject) => {
          deleteFile().then(res => {
            console.log(res);
            if (res.isDelete) {
              resolve();
            } else {
              reject(new Error('error'));
            }
          }).catch(err => {
            reject(err);
          })
        })
      }
    },
    mounted() {
      Promise.all([getFolderList(), getFileList()]).then(res => {
        this.folderList = res[0];
        this.fileList = res[1];
      })
    }
  }
</script>

<style lang="less">
.folder-wrapper {
  width: 300px;
}
</style>
