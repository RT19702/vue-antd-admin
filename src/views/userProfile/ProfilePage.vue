<template>
  <div>
    <a-row type="flex" justify="space-between" align="top">
      <!-- 最新动态 -->
      <a-col :lg="12" :sm="24" :xs="24">
        <a-card title="最新动态">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 最新用户状态信息
      userInfo: [],
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style>
</style>