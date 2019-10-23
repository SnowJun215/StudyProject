<template>
  <div class="home">
<!--    <p>{{food}}</p>-->
<!--    <button @click="handleClick('back')">返回上一页</button>-->
<!--    <button @click="handleClick('push')">跳转到parent</button>-->
<!--    <button @click="handleClick('replace')">替换到parent</button>-->
<!--    <button @click="getInfo" :style="{background: bgColor}">请求数据</button>-->
<!--    <img :src="url" alt="">-->
<!--    <button @click="handleLogout">退出登录</button>-->
    <Row>
      <Col></Col>
    </Row>
    <Row :gutter="10">
      <Col :span="12"></Col>
      <Col :span="12"></Col>
    </Row>
    <Row :gutter="10" class="blue">
      <Col :lg="6" :md="12" :sm="24" :xs="24"></Col>
      <Col :lg="6" :md="12" :sm="24" :xs="24"></Col>
      <Col :lg="6" :md="12" :sm="24" :xs="24"></Col>
      <Col :lg="6" :md="12" :sm="24" :xs="24"></Col>
    </Row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getUserInfo} from "@/api/user";
import {mapActions} from 'vuex';

export default {
  name: 'home',
  props: {
    food: {
      type: String,
      default: 'apple'
    }
  },
  data () {
    return {
      url: '',
      bgColor: ''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions(['logout']),
    handleClick (type) {
      if(type === 'back') {
        this.$router.back();
      } else if (type === 'push') {
        this.$router.push({
          name: 'argu',
          params: {
            name: 'test'
          }
        })
      } else if (type === 'replace') {
        this.$router.replace('/parent')
      }
    },
    getInfo () {
      getUserInfo({userId: 21}).then(res => {
        console.log(res.data);
        this.url = res.data.image;
        this.bgColor = res.data.color;
      }).catch(err => {
        console.log(err);
      })
    },
    handleLogout () {
      this.logout();
      this.$router.push({
        name: 'login'
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to);
    console.log(from);
    next(vm => {
      console.log(vm)
    });
  },
  // beforeRouteLeave (to, from, next) {
  //   const leave = confirm('您确定要离开么');
  //   if (leave) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // }
}
</script>

<style scoped lang="less">
.home {
  .ivu-col {
    height: 50px;
    background: pink;
    margin-top: 10px;
    background-clip: content-box;
  }
  .blue {
    .ivu-col {
      background: blue;
      background-clip: content-box;
    }
  }
}
</style>
