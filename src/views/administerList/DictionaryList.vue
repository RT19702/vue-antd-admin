<template>
  <div class="body fontColor">
    <div class="tree">
      <leftTree
        :treeData="treeData"
        :replaceFields="treeNodeReplaceFields"
        @nodeClick="nodeClick"
      />
    </div>
    <div class="content" v-show="treeNodeObj.data_dictionary_id !== undefined">
      <div class="tree-node-detail">
        <div class="title">
          <a-icon type="setting" /><span>基本信息</span>
          <div class="control">
            <div class="edit" @click="editNode"><a-icon type="edit" />编辑</div>
            <div class="delete"><a-icon type="delete" />删除</div>
          </div>
        </div>
        <a-descriptions title="">
          <a-descriptions-item label="数据项名称" span="3">
            {{ treeNodeObj.data_dictionary_name }}
          </a-descriptions-item>
          <a-descriptions-item label="数据顶关键字" span="3">
            {{ treeNodeObj.data_dictionary_key }}
          </a-descriptions-item>
          <a-descriptions-item label="数据项值" span="3">
            {{ treeNodeObj.data_dictionary_value }}
          </a-descriptions-item>
          <a-descriptions-item label="可否编辑" span="3">
            {{ treeNodeObj.can_edit === 1 ? '可编辑' : '不可编辑' }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="table-data">
        <div class="title">
          <a-icon type="database" /><span>数据子项</span>
          <div class="control">
            <div class="edit" @click="editNode"><a-icon type="plus" />添加</div>
          </div>
        </div>
        <a-table></a-table>
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
      editNodeObj: {},
      tableData: [],
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
          page_size: 9999,
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
      dictionaryApi
        .getData({
          page: 1,
          page_size: 9999,
          filters: JSON.stringify({
            pid: this.treeNodeObj.data_dictionary_id,
          }),
        })
        .then((res) => {
          if (res.status === 'success') {
            this.tableData = res.data.data
            console.log(
              '%c [ this.tableData ]-94',
              'font-size:15px; background:#5145a2; color:#9589e6;',
              this.tableData
            )
          }
        })
    },
    getData() {},
    editNode() {},
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
  width: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tree-node-detail {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e8e8;
  font-size: 17px;
  margin-bottom: 30px;
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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
</style>
