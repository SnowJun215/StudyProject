<template>
  <div>
    <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
  </div>
</template>

<script>
  import CountUp from 'countup';
  // import './count-to.less';
  export default {
    name: "CountTo",
    computed: {
      eleId () {
        return `count_up_${this._uid}`;
      },
      countClass () {
        return [
          'count-to-number',
          this.className
        ]
      }
    },
    data () {
      return {
        counter: {}
      }
    },
    props: {
      /**
       * @description 起始值
       */
      startVal: {
        type: Number,
        default: 0
      },
      /**
       * @description 最终值
       */
      endVal: {
        type: Number,
        require: true
      },
      /**
       * @description 小数点后保留几位小数
       */
      decimals: {
        type: Number,
        default: 0
      },
      /**
       * @description 动画延迟开始时间
       */
      delay: {
        type: Number,
        default: 0
      },
      /**
       * @description 渐变时长
       */
      duration: {
        type: Number,
        default: 1
      },
      /**
       * @description 是否使用变速
       */
      useEasing: {
        type: Boolean,
        default: false
      },
      /**
       * @description 是否使用分组
       */
      useGrouping: {
        type: Boolean,
        default: true
      },
      /**
       * @description 分组符号
       */
      separator: {
        type: String,
        default: ','
      },
      /**
       * @description 整数和小数分隔符号
       */
      decimal: {
        type: String,
        default: '.'
      },
      /**
       * @description 类名
       */
      className: {
        type: String,
        default: ''
      }
    },
    methods: {
      getCount () {
        return this.$refs.number.innerText;
      },
      emitEndEvent () {
        setTimeout(() => {
          this.$emit('on-animation-end', Number(this.getCount()));
        }, this.duration * 1000 + 50);
      }
    },
    watch: {
      endVal (newVal, oldVal) {
        this.counter.update(newVal);
        this.emitEndEvent();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
          useEasing: this.useEasing,
          useGrouping: this.useGrouping,
          separator: this.separator,
          decimal: this.decimal
        });
        setTimeout(() => {
          this.counter.start();
          this.emitEndEvent();
        }, this.delay);
      })
    }
  }
</script>

<style scoped lang="less">
@import "./count-to";
</style>
