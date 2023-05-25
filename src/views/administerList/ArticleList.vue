<template>
  <div>
    <TableDefault
      :columns="columns"
      :pagination="pagination"
      :data="articleList"
    >
      <template #status="{ slotProps }">
        <a-tag :color="getStatusColor(slotProps.article_status)">
          {{ slotProps.article_status_str }}
        </a-tag>
      </template>
      <template #type="{ slotProps }">
        <a-switch
          :checked="slotProps.enable_status === 1 ? true : false"
          @change="changeStatus(slotProps)"
        />
      </template>
    </TableDefault>
  </div>
</template>

<script>
import { TableDefault } from '@/components'
import * as article from '@/api/article'
export default {
  data() {
    return {
      // 表格列
      columns: [
        {
          key: 'article_title',
          dataIndex: 'article_title',
          title: '文章标题',
          align: 'center',
          width: 200,
          ellipsis: true,
        },
        {
          key: 'owner_str',
          dataIndex: 'owner_str',
          title: '用户名称',
          align: 'center',
          width: 150,
          ellipsis: true,
        },
        {
          key: 'created_time',
          dataIndex: 'created_time',
          title: '创建时间',
          align: 'center',
        },
        {
          key: 'article_view_count',
          dataIndex: 'article_view_count',
          title: '浏览量',
          align: 'center',
        },
        {
          key: 'article_collect_count',
          dataIndex: 'article_collect_count',
          title: '收藏量',
          align: 'center',
        },
        {
          key: 'article_follow_count',
          dataIndex: 'article_follow_count',
          title: '关注量',
          align: 'center',
        },
        {
          key: 'article_status',
          title: '审核状态',
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          key: 'enable_status',
          title: '文章状态',
          align: 'center',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'actions' },
        },
      ],
      params: {
        page: 1,
        page_size: 10
      },
      // 分页器
      pagination: {
        total: 0,
        defaultPageSize: 10,
        showTotal: (total) => `共 ${total} 条`,
      },
      // 表格数据
      articleList: []
    }
  },
  components: {
    TableDefault
  },
  methods: {
    async getArticleList() {
      const params = this.params
      const data = await article.getList(params)
      const responseData = data.data
      this.pagination.total = data.total
      if (responseData && responseData.length > 0) {
        this.articleList = responseData
      }
    },
    changeStatus() {
      console.log('changeStatus')
    }
  },
  computed: {
    getStatusColor: {
      get() {
        return (item) => {
          // 根据 item 的值来确定颜色
          switch (item) {
            case 1: // 草稿
              return ''
            case 2: // 审核中
              return 'orange'
            case 3: // 已发布
              return 'green'
            case 4: // 审批不通过
              return 'red'
            default:
              return ''
          }
        }
      },
    },
  },
  mounted() {
    this.getArticleList()
  }
}
</script>

<style>
</style>