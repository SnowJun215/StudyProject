<template>
  <div>
    <count-up ref="countTo" :end-val="endVal" @on-animation-end="handleEnd">
      <span slot="left">总金额：</span>
      <span slot="right">元</span>
    </count-up>
    <button @click="getNumber">获取数值</button>
    <button @click="up">更新值</button>
  </div>
</template>

<script>
  import CountUp from '@/components/count-to'
  export default {
    name: "count-to",
    data () {
      return {
        endVal: 100
      }
    },
    components: {
      CountUp
    },
    methods: {
      getNumber () {
        this.$refs.countTo.getCount();
      },
      up () {
        this.endVal += Math.random() * 100
      },
      handleEnd (endVal) {
        console.log('endVal: ', endVal);
      }
    }
  }
</script>

<style scoped>

</style>
