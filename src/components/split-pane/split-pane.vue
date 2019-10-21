<template>
    <div class="split-pane-wrapper" ref="outer">
      <div class="pane pane-left" :style="{width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px`}">
        <slot name="left"></slot>
      </div>
      <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{left: triggerLeft, width: `${triggerWidth}px`}"></div>
      <div class="pane pane-right" :style="{left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px`}">
        <slot name="right"></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: "split-pane",
    props: {
      value: {
        type: Number,
        default: 0.5
      },
      triggerWidth: {
        type: Number,
        default: 8
      },
      min: {
        type: Number,
        default: 0.1
      },
      max: {
        type: Number,
        default: 0.9
      }
    },
    data () {
      return {
        // value: 0.3,
        canMove: false,
        initOffset: 0,
      }
    },
    computed: {
      leftOffsetPercent () {
        return `${this.value * 100}%`
      },
      triggerLeft () {
        return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
      }
    },
    methods: {
      handleClick () {
        this.value -= 0.02;
      },
      handleMousedown (event) {
        document.addEventListener('mousemove', this.handleMousemove);
        document.addEventListener('mouseup', this.handleMouseup);
        this.initOffset = event.pageX - event.target.getBoundingClientRect().left - this.triggerWidth / 2;
        this.canMove = true;
      },
      handleMousemove (event) {
        if(!this.canMove) {
          return false;
        }
        const outer = this.$refs.outer.getBoundingClientRect();
        let offsetPercent = (event.pageX - this.initOffset - outer.left) / outer.width;
        if(offsetPercent < this.min) {
          offsetPercent = this.min;
        }
        if(offsetPercent > this.max) {
          offsetPercent = this.max;
        }
        // this.$emit('input', offsetPercent);
        this.$emit('update:value', offsetPercent);
      },
      handleMouseup () {
        this.canMove = false;
      }
    }
  }
</script>

<style scoped lang="less">
.split-pane-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    &-left {
      background: palevioletred;
    }
    &-right {
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }
    &-trigger-con {
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>
