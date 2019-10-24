<template>
  <div>
<!--    <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table>-->
    <edit-table-mult :columns="columns" v-model="tableData"></edit-table-mult>
  </div>
</template>

<script>
  import {getTableData} from "@/api/data";
  import EditTable from '_c/edit-table';
  import EditTableMult from '_c/edit-table-mult';

  export default {
    name: "m_table",
    data () {
      return {
        tableData: [],
        columns: [
          {
            key: 'name', title: '姓名'
          },
          {
            key: 'age', title: '年龄', editable: true
          },
          {
            key: 'email', title: '邮箱', editable: true
          },
        ]
      }
    },
    components: {
      EditTable,
      EditTableMult
    },
    mounted() {
      getTableData().then(res => {
        this.tableData = res;
      })
    },
    methods: {
      handleEdit ({row, index, column, newValue}) {
        console.log(row, index, column, newValue)
      }
    }
  }
</script>

<style scoped>

</style>
