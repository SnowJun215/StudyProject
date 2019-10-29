<template>
  <div>
    <Upload ref="upload" :action="`${baseURL}/file/upload_file`" multiple :before-upload="beforeUpload" :on-success="onSuccess" :show-upload-list="false">
      <Button icon="ios-cloud-upload-outline">Upload Files</Button>
    </Upload>
    <Button @click="handleUpload">上传{{file ? `“${file.name}”` : ''}}</Button>
    <Table :columns="columns" :data="fileList"></Table>
    <Modal v-model="showModal">
      <div style="height: 300px; overflow: auto">{{content}}</div>
    </Modal>
  </div>
</template>

<script>
  import {baseURL} from "@/config";
  import {getFilesList, getFile, delFile} from "@/api/data";
  import {downloadFile} from "@/lib/util";

  export default {
    name: "upload",
    data () {
      return {
        baseURL: baseURL,
        content: '',
        showModal: false,
        file: null,
        columns: [
          {
            title: '文件key', key: 'key'
          },
          {
            title: '文件名', key: 'file_name'
          },
          {
            title: '文件类型', key: 'file_type'
          },
          {
            title: '文件大小', key: 'file_size'
          },
          {
            title: '上传时间', key: 'createdAt'
          },
          {
            title: '存储有效期', key: 'storage_time', render: (h, {row}) => {
              return (<span>{row.storage_time ? row.storage_time : '永久'}</span>)
            }
          },
          {
            title: '操作', key: 'handle', render: (h, {row}) => {
              return (
                <button-group shape="circle" size="small">
                  <i-button on-click={this.download.bind(this, row.key)} icon="md-download" type="success" ghost/>
                  <i-button disabled={!row.file_type.includes('text')}
                            on-click={this.showFileContent.bind(this, row.key)} icon="md-eye" type="info" ghost/>
                  <i-button on-click={this.deleteFile.bind(this, row)} icon="md-trash" type="error" ghost/>
                </button-group>
              )
            }
          },
        ],
        fileList: []
      }
    },
    methods: {
      beforeUpload (file) {
        this.file = file;
        return false;
      },
      handleUpload () {
        if (!this.file) {
          this.$Message.error('请先选择文件');
          return false;
        }
        this.$refs.upload.post(this.file);
      },
      onSuccess () {
        this.$Message.success('文件上传成功');
        this.getFileList();
        this.file = null;
      },
      download (key) {
        downloadFile({
          url: `${baseURL}/file/get_file`,
          params: {
            key,
            type: 'download'
          }
        });
      },
      showFileContent (key) {
        getFile(key, 'text').then(res => {
          this.content = res;
          this.showModal = true;
        }).catch(err => {
          console.log(err);
        })
      },
      deleteFile (data) {
        this.$Modal.confirm({
          title: '提示',
          content: `您确定要删除${data.file_name}`,
          onOk: () => {
            delFile(data.key).then(res => {
              this.$Message.success('删除成功');
              this.getFileList();
            }).catch(err => {
              this.$Message.error('删除失败');
            })
          }
        });
      },
      getFileList () {
        getFilesList().then(res => {
          this.fileList = res;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.getFileList();
    }
  }
</script>

<style scoped>

</style>
