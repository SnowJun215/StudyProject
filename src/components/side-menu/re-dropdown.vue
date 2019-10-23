<template>
  <Dropdown @on-click="handleClick" transfer placement="right-start">
    <DropdownItem>
      <Icon :type="parent.icon" :color="iconColor " :size="20"></Icon>
      <span v-if="showTitle">{{parent.title}}</span>
    </DropdownItem>
    <DropdownMenu slot="list">
      <template v-for="item in parent.children">
        <re-dropdown
          v-if="item.children"
          :key="item.name"
          :name="item.name"
          :parent="item"></re-dropdown>
        <DropdownItem v-else :key="item.name" :name="item.name"><Icon :type="parent.icon" :size="20"></Icon>{{item.title}}</DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: "re-dropdown",
    props: {
      parent: {
        type: Object,
        default: () => {}
      },
      iconColor: {
        type: String,
        default: '#515a6e'
      },
      showTitle: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClick (name) {
        if(!this.showTitle) {
          // console.log(name);
          this.$emit('on-select', name);
        }
      }
    }
  }
</script>

<style scoped>

</style>
