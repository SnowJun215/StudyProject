<template>
  <div class="home">
    <p>{{food}}</p>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo" :style="{background: bgColor}">请求数据</button>
    <img :src="url" alt="">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {getUserInfo} from "@/api/user";

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
