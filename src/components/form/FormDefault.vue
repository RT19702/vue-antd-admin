<template>
  <a-modal
    :visible="visible"
    :width="modalData.width"
    :title="modalData.title"
    :confirm-loading="modalData.confirmLoading"
    :cancelText="cancelText"
    :okText="okText"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="scroll-bar">
      <a-form :form="form" ref="form" :layout="modalData.formLayout">
        <a-row :gutter="16">
          <div v-for="field in formFields" :key="field.key">
            <a-col :span="field.span ? field.span : 24">
              <a-form-item :label="field.label" :required="field.required">
                <!-- text文本框 -->
                <template v-if="field.type === 'text'">
                  <a-input
                    v-decorator="[
                      field.key,
                      {
                        rules: [
                          {
                            required: field.required,
                            message: `${field.label}不能为空`
                          }
                        ],
                        initialValue: field.value
                      }
                    ]"
                    :disabled="field.disabled"
                    :placeholder="`请输入${field.label}`"
                  ></a-input>
                </template>
                <!-- textarea 文本域 -->
                <template v-else-if="field.type === 'textarea'">
                  <a-textarea
                    v-decorator="[
                      field.key,
                      {
                        rules: [
                          {
                            required: field.required,
                            message: `${field.label}不能为空`
                          }
                        ],
                        initialValue: field.value
                      }
                    ]"
                    :disabled="field.disabled"
                    :placeholder="`请输入${field.label}`"
                    :auto-size="{
                      minRows: field.minRows || 5,
                      maxRows: field.maxRows || 8
                    }"
                    :maxLength="field.max || 256"
                  />
                </template>
                <!-- select下拉框 -->
                <template v-else-if="field.type === 'select'">
                  <a-select
                    :placeholder="`请选择${field.label}`"
                    v-decorator="[
                      field.key,
                      {
                        rules: [
                          {
                            required: field.required,
                            message: `请选择${field.label}`
                          }
                        ],
                        initialValue: field.value
                      }
                    ]"
                  >
                    <a-select-option
                      v-for="option in field.options"
                      :key="option.value"
                      :value="option.value"
                      >{{ option.label }}</a-select-option
                    >
                  </a-select>
                </template>
                <!-- checkbox多选框 -->
                <template v-else-if="field.type === 'checkbox'">
                  <a-checkbox-group
                    v-decorator="[
                      field.key,
                      {
                        rules: [
                          {
                            required: field.required,
                            message: `请选择${field.label}`
                          }
                        ],
                        initialValue: field.value
                      }
                    ]"
                  >
                    <a-checkbox
                      v-for="option in field.options"
                      :key="option.value"
                      :value="option.value"
                      :style="{ width: field.width }"
                      >{{ option.label }}</a-checkbox
                    >
                  </a-checkbox-group>
                </template>
                <!-- radio单选框 -->
                <template v-else-if="field.type === 'radio'">
                  <a-radio-group
                    v-decorator="[
                      field.key,
                      {
                        rules: [
                          {
                            required: field.required,
                            message: `请选择${field.label}`
                          }
                        ],
                        initialValue: field.value
                      }
                    ]"
                  >
                    <a-radio
                      v-for="option in field.options"
                      :key="option.value"
                      :value="option.value"
                      >{{ option.label }}</a-radio
                    >
                  </a-radio-group>
                </template>
                <!-- switch开关 -->
                <template v-else-if="field.type === 'switch'">
                  <a-switch
                    v-decorator="[field.key, { initialValue: field.value }]"
                    v-model="field.value"
                    :checked="field.value"
                    :checked-children="field.checkedChildren"
                    :un-checked-children="field.unCheckedChildren"
                  >
                  </a-switch>
                </template>
                <!-- slot插槽 -->
                <template v-else-if="field.type === 'slot'">
                  <slot :name="field.key"></slot>
                </template>
              </a-form-item>
            </a-col>
          </div>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      default: false,
    },
    // 弹窗数据
    modalData: {
      type: Object,
      default: () => {
        return {
          title: 'Modal Title',
          confirmLoading: false,
          formLayout: 'vertical', // horizontal | vertical | inline
        }
      },
    },
    // 表单数据
    formFields: {
      type: Array,
      default: () => [],
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: '取消',
    },
    // 确定按钮文字
    okText: {
      type: String,
      default: '确定',
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('saveEvent', values)
        }
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.$emit('update:visible', false)
    },
    // 设置表单值
    setFormValues(data) {
      setTimeout(() => {
        this.form.setFieldsValue(data)
      }, 0)
    },
  },
  mounted() { },
}
</script>

<style lang="scss" scoped>
.scroll-bar {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
