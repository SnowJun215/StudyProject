<template>
  <div>
    <a-input v-model="stateValue"/>
    <p>{{stateValue}}</p>
    <p>appName: {{appName}}, appNameWithVersion: {{appNameWithVersion}}</p>
    <p>userName: {{userName}}, firstLetter is: {{firstLetter}}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{appVersion}}</p>
    <button @click="handleChangeUserName">修改userName</button>
    <button @click="registerModule">动态注册模块</button>
    <p v-for="(li, index) in todoList" :key="index">{{li}}</p>
  </div>
</template>

<script>
  import AInput from '_c/AInput'
  import AShow from '_c/AShow'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: "store",
    data() {
      return {
        inputValue: ''
      }
    },
    components: {
      AInput,
      AShow
    },
    methods: {
      ...mapMutations(['SET_USER_NAME','SET_APP_NAME', 'SET_STATE_VALUE']),
      ...mapActions(['updateAppName']),
      handleInput(value) {
        this.SET_STATE_VALUE(value);
      },
      handleChangeAppName() {
        this.SET_APP_NAME('newAppName');
        // this.$store.commit('SET_APP_NAME', 'newAppName')
        // this.$store.commit({
        //   type: 'SET_APP_NAME',
        //   appName: 'newAppName'
        // })
        this.$store.commit({
          type: 'SET_APP_VERSION'
        })
        // this.updateAppName('newAppName');
      },
      handleChangeUserName() {
        this.SET_USER_NAME('newUserName')
        // this.$store.state.user. userName = 'hahaha'; // 错误方法
      },
      registerModule () {
        this.$store.registerModule(['user', 'todo'], {
          state: {
            todoList: ['学习mutations', '学习actions']
          }
        })
      }
    },
    computed: {
      ...mapState({
        appName: state => state.appName,
        userName: state => state.user.userName,
        appVersion: state => state.appVersion,
        todoList: state => state.user.todo ? state.user.todo.todoList : [],
      }),
      stateValue: {
        get () {
          return this.$store.state.stateValue;
        },
        set (value) {
          this.SET_STATE_VALUE(value);
        }
      },
      // ...mapState({
      //   userName: state => state.userName
      // }),
      ...mapGetters(['appNameWithVersion', 'firstLetter']),
      // ...mapGetters('user', ['firstLetter']),
      // appNameWithVersion() {
      //   return this.$store.getters.appNameWithVersion
      // },
      // appName() {
      //   return this.$store.state.appName + this.$store.state.appVersion
      // },
      // userName () {
      //   return this.$store.state.user.userName
      // }
    }
  }
</script>

<style scoped>

</style>
