<template>
  <div>
    <div class="operate">
      <a-button type="primary" @click="addMoadl">
        <a-icon type="plus" />新增公告
      </a-button>
    </div>
    <NoticeModal
      ref="formModal"
      :modalData="modalData"
      :visible.sync="modalVisible"
      :formFields="formFields"
      @saveEvent="handleSaveEvent"
    />
    <NoticeTable
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @changePagination="changePagination"
    >
      <template #type="{ slotProps }">
        <a-switch
          :checked="slotProps.enable_status === 1 ? true : false"
          @change="changeNoticeStatus(slotProps)"
        />
      </template>
      <!-- 操作 -->
      <template #actions="{ slotProps }">
        <div>
          <a-button
            class="button-margin"
            size="small"
            type="primary"
            @click="editMoadl(slotProps)"
          >
            <a-icon type="edit" />
            编辑
          </a-button>
          <a-popconfirm
            placement="topLeft"
            ok-text="确认"
            cancel-text="取消"
            @confirm="deleteNotice(slotProps)"
            ><template slot="title">
              <p>是否确认删除</p>
            </template>
            <a-button size="small" type="danger" class="button-margin">
              <a-icon type="delete" />
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </template>
    </NoticeTable>
  </div>
</template>

<script>
import NoticeModal from '@/components/form/FormDefault.vue'
import NoticeTable from '@/components/table/TableDefault.vue'
import {
  getNoticeApi,
  addNoticeApi,
  disableNoticeApi,
  enableNoticeApi,
  deleteNoticeApi,
  updateNoticeApi,
} from '@/api/list'
export default {
  components: {
    NoticeModal,
    NoticeTable,
  },
  data() {
    return {
      // 弹框表单配置
      formFields: [
        {
          label: '公告标题',
          type: 'text',
          required: true,
          key: 'notice_title',
          value: '',
        },
        {
          label: '公告内容',
          type: 'textarea',
          required: true,
          key: 'notice_content',
          value: '',
        },
      ],
      // 弹窗数据
      modalData: {
        formType: 'add',
        title: '新增公告',
        confirmLoading: false,
      },
      // 弹窗是否显示
      modalVisible: false,
      // 表格列
      columns: [
        {
          key: 'notice_title',
          dataIndex: 'notice_title',
          title: '公告标题',
          align: 'center',
        },
        {
          key: 'notice_content',
          dataIndex: 'notice_content',
          title: '公告内容',
          width: 650,
          ellipsis: true,
          align: 'center',
        },
        {
          key: 'created_time',
          dataIndex: 'created_time',
          title: '发布时间',
          align: 'center',
        },
        {
          key: 'owner_str',
          dataIndex: 'owner_str',
          title: '发布人',
          align: 'center',
        },
        {
          key: 'enable_status',
          // dataIndex: "notice_type",
          title: '公告状态',
          align: 'center',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'actions' },
        },
      ],
      // 表格数据
      data: [],
      // 参数
      params: {
        page: 1,
        page_size: 10,
      },
      // 分页器
      pagination: {
        total: 0,
        defaultPageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
      selectedNotice: null, // 存储选中的公告
    }
  },
  methods: {
    /**
     * @description 获取公告列表
     * @param {Boolean} initialLoad 是否初次加载
     */
    async getNoticeList(initialLoad = false) {
      const params = this.params
      const data = await getNoticeApi(params)
      this.pagination.total = data.total
      const responseData = data.data
      if (responseData && responseData.length > 0) {
        responseData.forEach((item) => {
          // 检查数据是否已存在
          const existingItem = this.data.find(
            (dataItem) => dataItem.key === item.key
          )
          if (!existingItem) {
            // 根据加载类型选择插入位置
            if (initialLoad) {
              // 新增数据时，将新数据插入到开头
              this.data.unshift({
                key: item.key,
                ...item,
              })
            } else {
              // 初次加载时，将新数据插入到末尾
              this.data.push({
                key: item.key,
                ...item,
              })
            }
          } else {
            // 更新已存在的数据
            Object.assign(existingItem, item)
          }
        })
      }
    },
    // 切换分页
    changePagination(pagination) {
      this.params.page = pagination.current
      this.params.page_size = pagination.pageSize
      this.getNoticeList()
    },
    // 新增弹框
    addMoadl() {
      this.modalVisible = true
      this.modalData.formType = 'add'
      this.modalData.title = '新增公告'
    },
    // 修改弹框
    editMoadl(item) {
      this.modalData.formType = 'edit'
      this.modalData.title = '编辑公告'
      this.selectedNotice = item
      // 将公告数据传递给编辑表单组件
      this.$refs.formModal.setFormValues({
        notice_title: item.notice_title,
        notice_content: item.notice_content,
      })
      // 打开弹窗
      this.modalVisible = true
    },
    // 新增公告
    addNotice(val) {
      // notice_type 公告类型暂时写死
      const params = {
        ...val,
        notice_type: 1,
      }
      addNoticeApi(params)
        .then(() => {
          this.$refs.formModal.form.resetFields()
          this.$message.success('新增成功')
          this.modalVisible = false
          this.getNoticeList(true)
        })
        .catch(() => {
          this.$message.error('新增失败')
        })
        .finally(() => {
          this.modalData.confirmLoading = false
        })
    },
    handleSaveEvent(val) {
      this.modalData.confirmLoading = true
      if (this.modalData.formType === 'add') {
        this.addNotice(val)
      } else {
        this.updateNotice(val)
      }
    },
    // 更改公告状态
    async changeNoticeStatus(item) {
      const { enable_status, notice_id } = item
      try {
        if (enable_status === 1) {
          await disableNoticeApi(notice_id)
          item.enable_status = 2
          this.$message.success('禁用成功')
        } else {
          await enableNoticeApi(notice_id)
          item.enable_status = 1
          this.$message.success('启用成功')
        }
      } catch (error) {
        console.error(error)
      }
    },
    updateNotice(val) {
      const { notice_id } = this.selectedNotice
      const params = {
        ...val,
      }
      updateNoticeApi(notice_id, params)
        .then(() => {
          this.$refs.formModal.form.resetFields()
          this.$message.success('修改成功')
          this.modalVisible = false
          // 更新 selectedNotice 的属性值
          Object.assign(this.selectedNotice, val)
        })
        .catch(() => {
          this.$message.error('修改失败')
        })
        .finally(() => {
          this.modalData.confirmLoading = false
        })
    },
    // 删除公告
    async deleteNotice(item) {
      const { notice_id } = item
      await deleteNoticeApi(notice_id)
      this.data = this.data.filter(
        (dataItem) => dataItem.notice_id !== notice_id
      )
      this.pagination.total -= 1
      this.$message.success('删除成功')
    },
  },
  mounted() {
    this.getNoticeList()
  },
}
</script>

<style lang="scss" scoped>
.button-margin {
  margin-left: 10px;
}
.operate {
  margin-bottom: 20px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
