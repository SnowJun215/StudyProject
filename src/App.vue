<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link :to="{name: 'home'}">Home</router-link> |-->
<!--      <router-link :to="{name: 'about'}">About</router-link>-->
<!--    </div>-->
<!--    <transition-group :name="routerTransition">-->
      <router-view key="default"/>
      <router-view key="email" name="email"/>
      <router-view key="tel" name="tel"/>
<!--    </transition-group>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        routerTransition: 'router '
      }
    },
    watch: {
      // '$route' (to) {
      //   to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
      // }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
  }
  /* 页面进入的效果 start*/
  /*进入前*/
  .router-enter {
    opacity: 0;
  }
  /*进入时*/
  .router-enter-active {
    transition: opacity 1s ease;
  }
  /*进入后*/
  .router-enter-to {
    opacity: 1;
  }
  /* 页面进入的效果 end*/

  /*页面离开的效果 start*/
  /*离开前*/
  .router-leave {
    opacity: 1;
  }
  /*离开时*/
  .router-leave-active {
    transition: opacity 1s ease;
  }
  /*离开后*/
  .router-leave-to {
    opacity: 0;
  }
  /*页面离开的效果 end*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
