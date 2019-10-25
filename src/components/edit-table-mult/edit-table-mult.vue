<template>
    <Table :columns="insideColumns" :data="value" class="edit-table"></Table>
</template>

<script>
  import clonedeep from 'clonedeep';
  export default {
    name: "edit-table",
    data () {
      return {
        insideData: [],
        insideColumns: []
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
      },
      value () {
        this.handleColumns();
      }
    },
    methods: {
      handleClick ({row, index, column}) {
        let rowObj = this.insideData[index];
        const isEditing = rowObj && rowObj.editingArr && rowObj.editingArr.indexOf(column.key) > -1;
        if (isEditing) {
          this.$emit('input', this.insideData);
          this.$emit('on-edit', {row, index, column, newValue: this.insideData[index][column.key]});
          rowObj.editingArr.splice(rowObj.editingArr.indexOf(column.key), 1);
        } else {
          rowObj.editingArr = rowObj.editingArr ? [...rowObj.editingArr, column.key] : [column.key];
        }
        this.insideData.splice(index, 1, rowObj);
      },
      handleInput (row, index, column, newValue) {
        this.insideData[index][column.key] = newValue;
      },
      handleColumns () {
        this.insideData = clonedeep(this.value);
        this.insideColumns = this.columns.map(item => {
          if (!item.render && item.editable) {
            item.render = (h, {row, index, column}) => {
              // console.log(row, index, column);
              const isEditing = this.insideData[index] && this.insideData[index].editingArr && this.insideData[index].editingArr.indexOf(column.key) > -1;
              return (
                <div>
                  {
                    isEditing ?
                      <i-input value={row[column.key]} on-input={this.handleInput.bind(this, row, index, column)}/> :
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
    float: right;
  }
}
</style>
