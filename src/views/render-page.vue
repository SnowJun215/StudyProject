<template>
  <div>
    <list :style="{color: 'red'}" :list="list">
      <count-to slot-scope="count" :end-val="count.number"></count-to>
    </list>
  </div>
</template>

<script>
  import List from '_c/list'
  import CountTo from '_c/count-to'
  export default {
    name: "render-page",
    data () {
      return {
        list: [
          {
            num: 100
          },
          {
            num: 200
          },
          {
            num: 300
          }
        ]
      }
    },
    components: {
      List,
      CountTo
    },
    methods: {
      renderFunc (h, name) {
        // return (
        //   <i on-click={this.handleClick} style={{color: 'pink'}}>{name}</i>
        // )
        return (
          <CountTo endVal={name} nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd}></CountTo>
        )
      },
      handleClick (event) {
        // console.log(event);
      },
      handleEnd (val) {
        // console.log('end', val);
      }
    }
  }
</script>

<style scoped>

</style>
