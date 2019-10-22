<template>
  <ul>
    <li @mousemove.prevent="handleMove" v-for="(item, index) in list" :key="`item_${index}`">
<!--      <span v-if="!render">{{item.num}}</span>-->
<!--      <render-dom v-else :render-func="render" :name="item.num"></render-dom>-->
      <slot :number="item.num"></slot>
    </li>
  </ul>
</template>

<script>
  import RenderDom from '_c/renderDom'
  export default {
    name: "list",
    components: {
      RenderDom
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      render: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      handleMove (event) {
        //
      }
    }
  }
</script>

<style scoped>

</style>
