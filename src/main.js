import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import { message } from 'ant-design-vue'
import { FormModel } from 'ant-design-vue'

// v-md-editor
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
  Hljs: hljs,
})

Vue.use(VMdPreview)
Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.$message = message
Vue.prototype.$bus = new Vue()
Vue.use(Antd)
// 这个重新引入一下ANTD的formModel是因为有可能会出现antd整体引入之后formModel失效的问题
// 我比较喜欢用这个form组件 by:H.Y.C.Y.B.H
Vue.use(FormModel)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
