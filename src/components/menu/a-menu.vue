<template>
  <div class="a-menu">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-menu"
  }
</script>

<style scoped lang="less">
  .a-menu{
    & * {
      list-style: none;
    }
    ul {
      padding: 0;
      margin: 0;
    }
  }
</style>
