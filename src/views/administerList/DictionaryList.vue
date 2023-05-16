<template>
  <div class="body">
    <div class="tree">
      <leftTree
        :treeData="treeData"
        :replaceFields="treeNodeReplaceFields"
        @nodeClick="nodeClick"
      />
    </div>
  </div>
</template>

<script>
import * as dictionaryApi from '@/api/dictionary'
import { leftTree } from '@/components'
export default {
  data() {
    return {
      treeNodeReplaceFields: {
        name: 'data_dictionary_name',
        id: 'data_dictionary_id',
      },
      params: {
        page: 1,
        page_size: 10,
        total: 0,
      },
      treeData: [],
    }
  },
  components: {
    leftTree,
  },
  methods: {
    getTree() {
      dictionaryApi
        .getData({
          page: 1,
          page_size: 10,
        })
        .then((res) => {
          if (res.status === 'success') {
            this.treeData = res.data.data
            console.log(
              '%c [ this.treeData ]-34',
              'font-size:15px; background:#9e29f6; color:#e26dff;',
              this.treeData
            )
          } else {
            this.$message.warning(res.msg)
          }
        })
    },
    nodeClick() {},
    getData() {},
  },
  mounted() {
    this.getTree()
  },
}
</script>

<style lang="less" scoped>
.body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
.tree {
  width: 370px;
  height: 100%;
}
</style>
