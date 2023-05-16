<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <SidebarMenu />
    <a-layout>
      <SiteHeader />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
export default {
  components: {
    SidebarMenu,
    SiteHeader,
  },
  data() {
    return {
      collapsed: false,
    }
  },
}
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  height: 100%;
}
</style>
