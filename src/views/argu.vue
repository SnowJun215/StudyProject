<template>
  <div>{{ name }}</div>
</template>

<script>
  export default {
    name: "argu.vue",
    props: {
      name: {
        type: String,
        default: 'test'
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to.name, from.name);
      next();
    }
  }
</script>

<style scoped>

</style>
