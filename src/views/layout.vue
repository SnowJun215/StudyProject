<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider collapsible hide-trigger breakpoint="sm" v-model="collapsed"></Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClass" @click.native="handleCollapsed" type="md-menu" :size="32" />
        </Header>
        <i-content class="content-con">
          <Card shadow class="page-card">
            <router-view></router-view>
          </Card>
        </i-content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "layout",
    data () {
      return {
        collapsed: false
      }
    },
    computed: {
      triggerClass () {
        return [
          'trigger-icon',
          this.collapsed ? 'rotate' : ''
        ];
      }
    },
    methods: {
      handleCollapsed () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>

<style scoped lang="less">
  .layout-wrapper, .layout-outer {
    height: 100%;
    .header-wrapper {
      background: #ffffff;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
      padding: 0 23px;
      .trigger-icon {
        cursor: pointer;
        transition: tranform .3s ease;
        &.rotate {
          transform: rotateZ(-90deg);
        }
      }
    }
    .content-con {
      padding: 10px;
    }
    .page-card {
      min-height: ~"calc(100vh - 84px)";
    }
  }
</style>
