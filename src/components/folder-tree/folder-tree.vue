<template>
  <Tree :data="folderTree" :render="renderFunc"></Tree>
</template>

<script>
  import {putFileInFolder, transferFolderListToTree, expandSpecifiedFolder} from "@/lib/util";
  import clonedeep from 'clonedeep';
  export default {
    name: "folder-tree",
    data () {
      return {
        folderTree: [],
        currentRenamingId: '',
        currentRenamingContent: '',
        renderFunc: (h, {root, node, data}) => {
          const dropList = this.isFolder(data.type ) ? this.folderDrop : this.fileDrop;
          const dropDownRender = dropList.map(item => {
            return (<dropdown-item name={item.name}>{item.title}</dropdown-item>)
          });
          const isRenaming = this.currentRenamingId === `${data.type || 'file'}_${data.id}`;
          return (
            <div class="tree-item">
              {
                this.isFolder(data.type ) && <Icon type="ios-folder" color="#2d8cf0" style="margin-right: 10px" />
              }
              {
                isRenaming
                  ?
                  <div class="input-wrapper">
                    <i-input value={data.title} on-input={this.handleInput.bind(this)} />
                    <i-button type="text" size="small"
                              on-click={this.handleSave.bind(this, data)}><Icon type="md-checkmark" /></i-button>
                    <i-button type="text" size="small"
                              on-click={this.handleCancel.bind(this)}><Icon type="md-close" /></i-button>
                  </div>
                  : data.title
              }
              {
                dropList && !isRenaming &&
                <dropdown placement="left-start" on-on-click={this.handleDropdownClick.bind(this, data)}>
                  <i-button size="small" type="text" class="tree-item-button">
                    <Icon type="md-more" size={12}/>
                  </i-button>
                  <dropdown-menu slot="list">
                    {dropDownRender}
                  </dropdown-menu>
                </dropdown>
              }
            </div>
          );
        }
      }
    },
    props: {
      folderList: {
        type: Array,
        default: () => []
      },
      fileList: {
        type: Array,
        default: () => []
      },
      folderDrop: Array,
      fileDrop: Array,
      beforeDelete: Function,
    },
    methods: {
      transData () {
        this.folderTree = transferFolderListToTree(putFileInFolder(this.folderList, this.fileList));
      },
      isFolder (type) {
        return type === 'folder';
      },
      handleDropdownClick (data, name) {
        switch (name) {
          case 'rename':
            this.currentRenamingId = `${data.type || 'file'}_${data.id}`;
            break;
          case 'delete':
            this.$Modal.confirm({
              title: '提示',
              content: `您确定要删除${this.isFolder(data.type) ? '文件夹' : '文件'}《${data.title}》`,
              onOk: () => {
                this.beforeDelete && this.beforeDelete().then(res => {
                  this.handleDelete(data);
                }).catch(err => {
                  this.$Message.error('删除失败');
                });
              }
            });
            break;
        }
      },
      handleInput (newValue) {
        this.currentRenamingContent = newValue;
      },
      updateList (list, id) {
        let i = -1;
        let len = list.length;
        while (++i < len) {
          let listItem = list[i];
          if (listItem.id === id) {
            listItem.name = this.currentRenamingContent;
            list.splice(i, 1, listItem);
            break;
          }
        }
        return list;
      },
      handleDelete (data) {
        let list = [], updateListName = '';
        if (this.isFolder(data.type)) {
          list = clonedeep(this.folderList);
          updateListName = 'folderList';
        } else {
          list = clonedeep(this.fileList);
          updateListName = 'fileList';
        }
        list = list.filter(item => item.id !== data.id);
        this.$emit(`update:${updateListName}`, list);
        this.$nextTick(() => {
          expandSpecifiedFolder(this.folderTree, data.folder_id);
        });
      },
      handleSave (data) {
        const id = data.id;
        let i = -1;
        let list = [];
        if (this.isFolder(data.type)) {
          list = this.updateList(clonedeep(this.folderList), id);
          this.$emit('update:folderList', list);
        } else {
          list = this.updateList(clonedeep(this.fileList), id);
          this.$emit('update:fileList', list);
        }
        this.$nextTick(() => {
          expandSpecifiedFolder(this.folderTree, data.folder_id);
        });
        this.handleCancel();
      },
      handleCancel () {
        this.currentRenamingId = '';
        this.currentRenamingContent = '';
      }
    },
    watch: {
      folderList () {
        this.transData();
      },
      fileList () {
        this.transData();
      }
    },
    mounted() {
      this.transData();
    }
  }
</script>

<style lang="less">
.tree-item {
  display: inline-block;
  width: ~"calc(100% - 50px)";
  height: 30px;
  line-height: 30px;
  .input-wrapper {
    display: inline-block;
    .ivu-input-wrapper {
      width: ~"calc(100% - 47px)";
    }
  }
  & > .ivu-dropdown {
    float: right;
  }
}
</style>
