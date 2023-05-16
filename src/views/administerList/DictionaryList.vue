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
      <div
        v-show="
          treeNodeObj.data_dictionary_id !== undefined && loading === false
        "
      >
        <div class="tree-node-detail">
          <div class="title">
            <a-icon type="setting" /><span>基本信息</span>
            <div class="control">
              <div class="edit" @click="editNode">
                <a-icon type="edit" />编辑
              </div>
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
              <div class="edit" @click="editNode">
                <a-icon type="plus" />添加
              </div>
            </div>
          </div>
          <a-table></a-table>
        </div>
      </div>
      <div
        class="loaderContent"
        v-show="
          treeNodeObj.data_dictionary_id === undefined || loading === true
        "
      >
        <div class="loader"></div>
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
      loading: false,
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
      this.loading = true
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
        .finally(() => {
          this.loading = false
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
.loaderContent {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 120px;
  height: 150px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-image: linear-gradient(#ddd 50%, #bbb 51%),
    linear-gradient(#ddd, #ddd), linear-gradient(#ddd, #ddd),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%),
    radial-gradient(ellipse at center, #aaa 25%, #eee 26%, #eee 50%, #0000 55%);
  background-position: 0 20px, 45px 0, 8px 6px, 55px 3px, 75px 3px, 95px 3px;
  background-size: 100% 4px, 1px 23px, 30px 8px, 15px 15px, 15px 15px, 15px 15px;
  position: relative;
  border-radius: 6%;
  animation: shake 3s ease-in-out infinite;
  transform-origin: 60px 180px;
}

.loader:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 100%;
  width: 7px;
  height: 5px;
  background: #aaa;
  border-radius: 0 0 4px 4px;
  box-shadow: 102px 0 #aaa;
}

.loader:after {
  content: '';
  position: absolute;
  width: 95px;
  height: 95px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 20px;
  background-color: #bbdefb;
  background-image: linear-gradient(
      to right,
      #0004 0%,
      #0004 49%,
      #0000 50%,
      #0000 100%
    ),
    linear-gradient(135deg, #64b5f6 50%, #607d8b 51%);
  background-size: 30px 100%, 90px 80px;
  border-radius: 50%;
  background-repeat: repeat, no-repeat;
  background-position: 0 0;
  box-sizing: border-box;
  border: 10px solid #ddd;
  box-shadow: 0 0 0 4px #999 inset, 0 0 6px 6px #0004 inset;
  animation: spin 3s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  75% {
    transform: rotate(750deg);
  }

  100% {
    transform: rotate(1800deg);
  }
}

@keyframes shake {
  65%,
  80%,
  88%,
  96% {
    transform: rotate(0.5deg);
  }

  50%,
  75%,
  84%,
  92% {
    transform: rotate(-0.5deg);
  }

  0%,
  50%,
  100% {
    transform: rotate(0);
  }
}
</style>
