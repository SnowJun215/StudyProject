<template>
    <Table :columns="insideColumns" :data="value" class="edit-table"></Table>
</template>

<script>
  import clonedeep from 'clonedeep';
  export default {
    name: "edit-table",
    data () {
      return {
        insideColumns: [],
        editingId: '',
        editingContent: ''
      }
    },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      columns () {
        this.handleColumns();
      }
    },
    methods: {
      handleClick ({row, index, column}) {
        const isEditing = this.editingId === `${column.key}_${index}`;
        if (isEditing) {
          let tableData = clonedeep(this.value);
          tableData[index][column.key] = this.editingContent;
          this.$emit('input', tableData);
          this.$emit('on-edit', {row, index, column, newValue: this.editingContent});
          this.editingId = '';
          this.editingContent = '';
        } else {
          this.editingId = `${column.key}_${index}`;
          this.editingContent = row[column.key];
        }
      },
      handleInput (newValue) {
        this.editingContent = newValue;
      },
      handleColumns () {
        this.insideColumns = this.columns.map(item => {
          if (!item.render && item.editable) {
            item.render = (h, {row, index, column}) => {
              // console.log(row, index, column);
              const isEditing = this.editingId === `${column.key}_${index}`;
              return (
                <div>
                  {
                    isEditing ?
                      <i-input value={row[column.key]} on-input={this.handleInput}/> :
                      <span>{row[column.key]}</span>
                  }
                  <i-button type={isEditing ? "success" : "primary"} shape="circle" size="small"
                            icon={isEditing ? "md-checkmark-circle-outline" : "ios-create"}
                            on-click={this.handleClick.bind(this, {row, index, column})}/>
                </div>
              );
            };
          }
          return item
        });
      }
    },
    mounted() {
      this.handleColumns();
    }
  }
</script>

<style lang="less">
  .edit-table {
    .ivu-input-wrapper {
      width: ~"calc(100% - 30px)";
    }
    .ivu-btn {
      margin-left: 6px;
    }
  }
</style>
