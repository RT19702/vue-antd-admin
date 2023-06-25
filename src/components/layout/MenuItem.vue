<template functional>
  <a-sub-menu
    v-if="props.menuList.children && props.menuList.children.length"
    :key="Math.random()"
  >
    <span slot="title">
      <template v-if="props.menuList.icon">
        <a-icon :type="props.menuList.icon" />
      </template>
      <span>{{ props.menuList.name }}</span>
    </span>
    <MenuItem
      v-for="item in props.menuList.children"
      :key="item.id"
      :menuList="item"
    />
  </a-sub-menu>
  <a-menu-item v-else :key="Math.random()">
    <router-link :to="props.menuList.path">
      <template v-if="props.menuList.icon">
        <a-icon :type="props.menuList.icon" />
      </template>
      <span>{{ props.menuList.name }}</span>
    </router-link>
  </a-menu-item>
</template>

<script>
export default {
  name: 'MenuItem', // 组件内递归
  props: {
    menuList: {},
  },
  mounted() { },
}
</script>

<style>
</style>