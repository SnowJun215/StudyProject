<template>
  <div>
    <button @click="handleClick">按我</button>
  </div>
</template>

<script>
  export default {
    name: "email",
    methods: {
      handleClick () {
        this.$bus.$emit('on-click', 'hello')
      }
    },
    mounted() {
      console.log(this.$bus)
    }
  }
</script>

<style scoped>

</style>
