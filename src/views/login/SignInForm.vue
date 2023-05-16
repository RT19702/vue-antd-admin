<template>
  <div class="container">
    <div class="login">
      <div class="header d-flex align-items-center justify-center">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="账号" class="account">
          <a-input
            autocomplete="autocomplete"
            size="large"
            placeholder="zlhranhou"
            v-decorator="[
              'staff_account',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入账户名',
                    whitespace: true,
                  },
                ],
              },
            ]"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            size="large"
            placeholder="zlhranhou"
            autocomplete="autocomplete"
            type="password"
            v-decorator="[
              'pwd',
              {
                rules: [
                  { required: true, message: '请输入密码', whitespace: true },
                ],
              },
            ]"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            class="gradient-button"
            style="width: 100%"
            :loading="loading"
            size="large"
            htmlType="submit"
            type="primary"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  data() {
    return {
      systemName: 'International Web',
      loading: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          loginApi(values)
            .then((res) => {
              if (res.status === 'success') {
                this.$router.push('/')
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: url("@/assets/img/theme_back.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header {
    margin-bottom: 20px;
    .logo {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
    }
    .title {
      font-size: 33px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      position: relative;
      top: 2px;
    }
  }
  .login {
    width: 550px;
    margin: 0 auto;
    background: #fff;
    padding: 30px;
    .account {
      margin-bottom: 10px;
    }
  }
  .gradient-button {
    /* 在这里添加上面定义的渐变样式 */
    background-image: linear-gradient(to right, #00add4, #00dea5);
    border-color: unset;
    margin-top: 15px;
  }
}
</style>