<template>
  <div class="footer">
    <div class="copyright">
      <a :href="githubLink" target="_blank" class="default-color">
        Copyright <a-icon type="copyright" /> IWebG
        <i>|</i>
        <a-icon type="github" />
      </a>
    </div>
    <div class="linkList">
      蜀ICP备2022021615号-2
      <a :href="icpFilingLink" target="_blank" class="default-color"
        >iwebg.cn</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['githubLink', 'icpFilingLink'],
  mounted() {
    console.log('🚀 ~ file: PageFooter.vue:7 ~ this.linkList', this.linkList)
  }
}
</script>

<style lang="scss" scoped>
$default-color: rgba(0, 0, 0, 0.45);

.default-color {
  color: $default-color;
}

.footer {
  // background: #fff;
  padding: 8px;
  text-align: center;
  color: $default-color;
  font-size: 14px;
  .copyright {
    margin-bottom: 5px;
    i {
      margin: 0 4px;
    }
  }
}
</style>