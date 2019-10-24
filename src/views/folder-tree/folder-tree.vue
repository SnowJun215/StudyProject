<template>
  <div class="folder-wrapper">
    <Tree :data="folderTree" :render="renderFunc"></Tree>
  </div>
</template>

<script>
  import {getFileList, getFolderList} from "@/api/data";
  import {putFileInFolder, transferFolderListToTree} from "@/lib/util";

  export default {
    name: "folder-tree",
    data () {
      return {
        folderTree: [],
        renderFunc: (h, {root, node, data}) => {
          return (
            <div class="tree-item">
              {
                data.type === 'folder' && <Icon type="ios-folder" color="#2d8cf0" style="margin-right: 10px" />
              }
              {data.title}
            </div>
          );
        }
      }
    },
    mounted() {
      Promise.all([getFolderList(), getFileList()]).then(res => {
        console.log(res);
        this.folderTree = transferFolderListToTree(putFileInFolder(res[0], res[1]));
      })
    }
  }
</script>

<style lang="less">
.folder-wrapper {
  width: 300px;
  .tree-item {
    display: inline-block;
    width: ~"calc(100% - 50px)";
    height: 30px;
    line-height: 30px;
  }
}
</style>
