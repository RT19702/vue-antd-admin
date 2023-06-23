<template>
  <!-- <v-md-editor height="400px"></v-md-editor> -->
  <div class="editor">
    <v-md-preview :text="text"></v-md-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    }
  }
}
</script>

<style lang='scss'>
.editor {
  border: 1px solid #dddddd;
  min-height: 200px;
}
.github-markdown-body {
  padding: 15px;
}
</style>