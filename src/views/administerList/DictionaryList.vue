<template>
  <div class="body fontColor">
    <div class="tree">
      <leftTree
        :treeData="treeData"
        :replaceFields="treeNodeReplaceFields"
        @nodeClick="nodeClick"
      />
    </div>
    <div class="content">
      <div class="tree-node-detail">
        <div class="title">
          <a-icon type="setting" /><span>基本信息</span>
          <div class="control">
            <div class="edit"><a-icon type="edit" />编辑</div>
            <div class="delete"><a-icon type="delete" />删除</div>
          </div>
        </div>
      </div>
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
      treeNodeObj: {},
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
          } else {
            this.$message.warning(res.msg)
          }
        })
    },
    nodeClick(node) {
      this.treeNodeObj = node
      console.log(node)
    },
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
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tree-node-detail {
  width: calc(100% - 60px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  .title {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
      font-weight: bold;
    }
    .control {
      display: flex;
      margin-left: 10px;
      gap: 5px;
      .edit {
        color: #1890ff;
        cursor: pointer;
      }
      .delete {
        color: #f5222d;
        cursor: pointer;
      }
      div {
        display: flex;
        align-items: center;
        font-size: 13px;
        gap: 4px;
      }
    }
  }
}
</style>
