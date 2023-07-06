<template>
  <div>
    <TableDefault
      :columns="userColumns"
      :data="userList"
      :pagination="pagination"
    >
      <template #state="{ slotProps }">
        <a-switch :checked="slotProps.enable_status === 1 ? true : false" />
      </template>
    </TableDefault>
  </div>
</template>

<script>
import * as user from '@/api/user'
import { TableDefault, FormDefault } from '@/components'
export default {
  components: {
    TableDefault,
    FormDefault,
  },
  data() {
    return {
      params: {
        page: 1,
        page_size: 10,
      },
      userColumns: [
        {
          key: 'user_id',
          dataIndex: 'user_id',
          title: '用户ID',
          align: 'center',
        },
        {
          key: 'user_account',
          dataIndex: 'user_account',
          title: '用户账号',
          align: 'center'
        },
        {
          key: 'user_name',
          dataIndex: 'user_name',
          title: '用户名称',
          align: 'center'
        },
        {
          key: 'enable_status',
          // dataIndex: 'enable_status',
          title: '用户状态',
          align: 'center',
          scopedSlots: { customRender: 'state' },
        }
      ],
      // 分页器
      pagination: {
        total: 0,
        defaultPageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
      userList: []
    }
  },
  methods: {
    async getUserList() {
      const params = this.params
      const response = await user.getUserListApi(params)
      const responseData = response.data
      if (responseData && responseData.length > 0) {
        params.page++
        this.userList.push(...responseData)
      }
    }
  },
  mounted() {
    this.getUserList()
  },
}
</script>

<style>
</style>