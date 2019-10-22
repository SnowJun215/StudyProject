<template>
    <div class="a-submenu">
      <div class="a-submenu-title" @click="handleClick">
        <slot name="title"></slot>
        <span :class="['shrink-icon', showChild ? 'active' : '']"></span>
      </div>
      <div v-show="showChild" class="a-submenu-child-box">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "a-submenu",
    data () {
      return {
        showChild: false
      }
    },
    methods: {
      handleClick () {
        this.showChild = !this.showChild;
      }
    }
  }
</script>

<style scoped lang="less">
.a-submenu {
  background: rgb(33, 35, 39);
  &-title {
    color: #ffffff;
    position: relative;
    background: rgb(33, 35, 39);
    .shrink-icon {
      position: absolute;
      top: 50%;
      right: 4px;
      width: 6px;
      height: 6px;
      border: 1px solid;
      border-left: none;
      border-bottom: none;
      transform: rotate(45deg);
      margin-top: -3px;
      &.active {
        transform: rotate(135deg);
        margin-top: -4px;
      }
    }
  }
  &-child-box {
    overflow: hidden;
    padding-left: 20px;
  }
}
</style>
