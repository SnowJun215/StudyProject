<template>
  <div class="split-pane-con">
    <split-pane :value.sync="offset">
      <div slot="left">left</div>
      <div slot="right">right</div>
    </split-pane>
  </div>
</template>

<script>
  import SplitPane from '_c/split-pane';
  export default {
    // name: "split-pane",
    data () {
      return {
        offset: 0.8
      }
    },
    components: {
      SplitPane
    },
    methods: {
      // handleInput (value) {
      //   this.offset = value;
      // }
    }
  }
</script>

<style scoped lang="less">
.split-pane-con {
  width: 400px;
  height: 300px;
  background: papayawhip;
}
</style>
