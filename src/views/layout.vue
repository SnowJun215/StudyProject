<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider width="300" collapsible hide-trigger breakpoint="sm" v-model="collapsed">
        <side-menu :collapsed="collapsed" :list="menuList"></side-menu>
      </Sider>
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
  import SideMenu from '_c/side-menu';
  export default {
    name: "layout",
    data () {
      return {
        collapsed: false,
        menuList: [
          {
            title: '11111',
            name: 'menu1',
            icon: 'md-aperture'
          },
          {
            title: '22222',
            name: 'menu2',
            icon: 'md-aperture'
          },
          {
            title: '33333',
            name: 'menu3',
            icon: 'md-aperture',
            children: [
              {
                title: '33333-111',
                name: 'menu31',
                icon: 'md-aperture'
              },
              {
                title: '33333-222',
                name: 'menu32',
                icon: 'md-aperture',
                children: [
                  {
                    title: '33333-222-111',
                    name: 'menu321',
                    icon: 'md-aperture'
                  },
                  {
                    title: '33333-222-222',
                    name: 'menu322',
                    icon: 'md-aperture',
                    children: [
                      {
                        title: '33333-222-222-111',
                        name: 'menu3221',
                        icon: 'md-aperture'
                      },
                      {
                        title: '33333-222-222-222',
                        name: 'menu3222',
                        icon: 'md-aperture'
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      }
    },
    components: {
      SideMenu
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
