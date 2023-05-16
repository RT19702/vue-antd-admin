<template>
  <div class="body"></div>
</template>

<script>
import * as dictionaryApi from '@/api/dictionary'
export default {
  data() {
    return {
      params: {
        page: 1,
        page_size: 10,
        total: 0,
      },
      treeData: [],
    }
  },
  methods: {
    getData() {
      dictionaryApi.getData(this.params).then((res) => {
        if (res.status === 'success') {
          const result = res.data
          if (result.data.length === 0 && result.current_page > 1) {
            this.params.page--
            this.getData()
            return false
          } else {
            // ...render table
            this.params.total = result.total
            this.page = result.current_page
            this.treeData = result.data
            console.log(
              '%c [ this.treeData ]-32',
              'font-size:15px; background:#78fad8; color:#bcffff;',
              this.treeData
            )
          }
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style></style>
