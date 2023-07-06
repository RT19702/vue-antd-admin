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
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
      <PageFooter
        :icpFilingLink="footerLink.icpFilingLink"
        :githubLink="footerLink.githubLink"
      ></PageFooter>
    </a-layout>
  </a-layout>
</template>
<script>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import PageFooter from '@/components/layout/footer/PageFooter'
import { mapState } from 'vuex'
export default {
  components: {
    SidebarMenu,
    SiteHeader,
    PageFooter
  },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    ...mapState('setting', ['footerLink'])
  }
}
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  height: 100%;
}
</style>
