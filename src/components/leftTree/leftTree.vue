<template>
  <div class="left-tree">
    <div
      :class="[
        nodeObj[replaceFields.id] === item[replaceFields.id]
          ? 'active-node'
          : '',
        'tree-node',
      ]"
      v-for="(item, index) in treeData"
      @click="nodeClick(item, index)"
      :key="index"
    >
      {{ item[replaceFields.name] }}
    </div>
    <div
      class="block"
      :style="{ top: blockTop + 'px' }"
      v-show="nodeObj[replaceFields.id]"
    ></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      },
    },
    replaceFields: {
      type: Object,
      default: () => {
        return {
          name: 'name',
          id: 'id',
        }
      },
    },
  },
  data() {
    return {
      nodeObj: {},
      blockTop: 5,
    }
  },
  methods: {
    nodeClick(item, index) {
      this.nodeObj = item
      this.blockTop = index * 55 + 5
      this.$emit('nodeClick', item)
    },
  },
}
</script>
<style lang="less" scoped>
.left-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
  position: relative;
}
.tree-node {
  padding-right: 20px;
  text-align: right;
  padding-top: 17px;
  padding-bottom: 17px;
  color: #595959;
  &:hover {
    cursor: pointer;
    color: #1890ff;
  }
}
.active-node {
  background: #e6f7ff;
  color: #1890ff;
  position: relative;
}
.block {
  position: absolute;
  top: 0px;
  right: -3px;
  width: 3px;
  height: 45px;
  background: #1890ff;
  transition: all 0.2s;
}
</style>
