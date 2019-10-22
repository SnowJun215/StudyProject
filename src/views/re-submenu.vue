<template>
  <a-submenu>
    <div slot="title">{{parent.title}}</div>
    <template v-for="(item, index) in parent.children">
      <a-menu-item v-if="!item.children" :key="`menu_item_${i}_${index}`">{{item.title}}</a-menu-item>
      <re-submenu v-else :key="`menu_item_${i}_${index}`" :parent="item"></re-submenu>
    </template>
  </a-submenu>
</template>

<script>
  import menuComponents from '_c/menu';
  const {AMenuItem, ASubmenu} = menuComponents;
  export default {
    name: "re-submenu",
    components: {
      AMenuItem,
      ASubmenu
    },
    props: {
      parent: {
        type: Object,
        default: () => {}
      },
      i: Number
    }
  }
</script>

<style scoped>

</style>
