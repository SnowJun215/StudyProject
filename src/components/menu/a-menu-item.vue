<template>
  <div class="a-menu-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "a-menu-item"
  }
</script>

<style scoped lang="less">
.a-menu-item {
  background: rgb(90, 92,104);
  color: #ffffff;
}
</style>
