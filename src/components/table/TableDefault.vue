<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :row-selection="rowSelection"
    @change="handleTableChange"
    bordered
  >
    <template
      v-for="column in columns"
      :slot="column.scopedSlots ? column.scopedSlots.customRender : ''"
      slot-scope="slotProps"
    >
      <slot
        :name="column.scopedSlots ? column.scopedSlots.customRender : ''"
        :slotProps="slotProps"
      ></slot>
    </template>
  </a-table>
</template>

<script>
export default {
  props: {
    // 表格列
    columns: {
      type: Array,
      default: () => [],
    },
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    // 分页器
    pagination: {
      type: Object,
      default: () => ({
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        defaultPageSize: 10,
        defaultCurrent: 1,
        total: 0,
      }),
    },
    // 表格行选择
    rowSelection: {
      default: undefined,
    },
  },
  methods: {
    handleTableChange(pagination) {
      this.$emit('changePagination', pagination)
    },
  },
}
</script>

<style></style>
