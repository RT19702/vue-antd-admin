<template>
  <a-layout-sider :trigger="null" v-model="collapsed" collapsible>
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="" class="image" />
      <span class="title" v-show="!collapsed">International Web</span>
    </div>
    <a-menu theme="dark" mode="inline">
      <MenuItem v-for="item in menuList" :key="item.id" :menuList="item" />
    </a-menu>
  </a-layout-sider>
</template>

<script>
import MenuItem from './MenuItem.vue'
import menuList from './menuList.js'
import { mapState } from 'vuex'
export default {
  // 组件逻辑代码
  components: {
    MenuItem,
  },
  data() {
    return {
      menuList,
    }
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.setting.collapsed,
    }),
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.logo {
  height: 50px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  padding: 10px 5px;
  .image {
    height: 100%;
  }
  .title {
    color: #fff;
    margin-left: 5px;
    font-weight: bold;
  }
}
</style>
