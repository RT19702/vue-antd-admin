<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="d-flex justify-between align-items-center header">
      <div>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggleCollapsed"
        />
      </div>
      <div>
        <a-dropdown>
          <img src="@/assets/img/logo.png" alt="" class="logo" />
          <a-menu slot="overlay">
            <a-menu-item>
              <span @click="logout"><a-icon type="poweroff" />退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.setting.collapsed,
    }),
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit('setting/SET_COLLAPSED', !this.collapsed)
    },
    // 退出登录
    logout() {
      this.$router.push('/login')
      /* this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/login");
      }); */
    },
  },
}
</script>

<style lang="scss">
.header {
  padding: 0 24px;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #00b8c9;
    }
  }
  .logo {
    height: 30px;
    cursor: pointer;
  }
}
</style>