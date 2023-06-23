<template>
  <div>
    <!-- 文章禁用表单 -->
    <FormDefault
      ref="disableForm"
      :visible.sync="disableFormVisible"
      :modalData="disablemodalData"
      :formFields="disableFormConfig"
      @saveEvent="disableInfo"
    />
    <!-- 文章详情表单 -->
    <FormDefault
      ref="articleForm"
      :visible.sync="articleFormVisible"
      :modalData="articleFormData"
      :formFields="articleFormConfig"
    >
      <template #article_content>
        <MdEditor />
      </template>
    </FormDefault>
    <!-- 文章列表 -->
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
      <template #actions="{ slotProps }">
        <div class="d-flex justify-around">
          <a-button
            class="button-margin"
            size="small"
            type="primary"
            @click="seeDetails(slotProps)"
          >
            <a-icon type="file-search" />
            详情
          </a-button>
        </div>
      </template>
    </TableDefault>
  </div>
</template>

<script>
import { TableDefault, FormDefault, MdEditor } from '@/components'
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
          width: '10vw',
          ellipsis: true,
        },
        {
          key: 'owner_str',
          dataIndex: 'owner_str',
          title: '用户名称',
          align: 'center',
          width: '10vw',
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
          width: '10vw',
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
      articleList: [],
      // 是否显示文章禁用表单
      disableFormVisible: false,
      // 禁用表单配置
      disableFormConfig: [{
        label: '禁用原因',
        type: 'textarea',
        required: true,
        key: 'noPassNotice',
        value: '',
      },],
      // 禁用文章弹框
      disablemodalData: {
        title: '禁用文章',
        confirmLoading: false,
        formLayout: 'vertical',
      },
      // 文章详情
      articleFormVisible: false,
      // 文章详情表单弹框
      articleFormData: {
        title: '文章详情',
        confirmLoading: false,
        formLayout: 'vertical',
        width: '50vw'
      },
      // 文章详情配置
      articleFormConfig: [{
        label: '文章标题',
        type: 'text',
        key: 'article_title',
        value: '',
        disabled: true,
      },
      {
        label: '创建人名称',
        type: 'text',
        key: 'owner_str',
        value: '',
        disabled: true,
        span: 24,
      },
      {
        label: '文章展现量',
        type: 'text',
        key: 'article_id',
        value: '',
        disabled: true,
        span: 6,
      },
      {
        label: '文章浏览量',
        type: 'text',
        key: 'article_view_count',
        value: '',
        disabled: true,
        span: 6,
      },
      {
        label: '文章收藏量',
        type: 'text',
        key: 'article_collect_count',
        value: '',
        disabled: true,
        span: 6,
      },
      {
        label: '文章关注量',
        type: 'text',
        key: 'article_follow_count',
        value: '',
        disabled: true,
        span: 6,
      },
      {
        label: '文章内容',
        type: 'slot',
        key: 'article_content',
        value: '',
        disabled: true,
        span: 24,
      }
      ],
      // 当前选中文章信息
      selectedCurrent: {},
    }
  },
  components: {
    TableDefault,
    FormDefault,
    MdEditor
  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      const params = this.params
      const data = await article.getList(params)
      const responseData = data.data
      this.pagination.total = data.total
      if (responseData && responseData.length > 0) {
        params.page++
        this.articleList.push(...responseData)
      }
    },
    // 改变文章状态
    async changeStatus(item) {
      const { enable_status, article_id } = item
      if (enable_status === 1) {
        this.disableFormVisible = true
        this.selectedCurrent = item
      } else {
        item.enable_status = 1
        await article.enableArticle(article_id)
        this.$message.success('启用成功')
      }
    },
    // 禁用文章
    async disableInfo(val) {
      const { article_id } = this.selectedCurrent
      await article.disableArticle(article_id, val)
      this.selectedCurrent.enable_status = 2
      this.$message.success('禁用成功')
      this.disableFormVisible = false
      this.$refs.disableForm.setFormValues({
        noPassNotice: ''
      })
    },
    // 查看文章详情
    seeDetails(item) {
      console.log('🚀 ~ file: ArticleList.vue:185 ~ seeDetails ~ item:', item)
      this.articleFormVisible = true
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