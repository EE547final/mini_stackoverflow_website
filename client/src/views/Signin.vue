<template>
  <div >
    <h2 class="login-title">BufferOverflow</h2>
    <a-spin tip="Loading" :spinning="loginModalLoading">
      <a-form ref="form" :model="form" class="login-form">
        <h2 class="title">WELCOME</h2>
        <a-form-item>
          <div class="input-title">Username</div>
          <a-input v-model:value="signinUser.email">
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="input-title"><span>Password</span> <a class="forgot">Forgot Password?</a></div>
          <a-input-password v-model:value="signinUser.password">
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <!-- <a-button type="primary" ></a-button> -->
          <a-button size="large" @click="onSubmit" type="primary" block>Sign In</a-button>
        </a-form-item>
        <div class="signup">Don't have an acoount?
          <router-link to="/signup">Sign Up</router-link>
        </div>
      </a-form>
    </a-spin>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import store from '@/store';
  export default defineComponent({
    name: 'Signin',
    components: {
    },
    setup() {
      const router = useRouter();
      // signin info input by user
      const signinUser = ref({
        email: "",
        password: "",
      })
      // user info from server
      const user = ref({});
      // state control variables
      const loginModalLoading = ref(false);
      const onSubmit = () => {
        console.log('sign in started...');
        if (signinUser.value.email && signinUser.value.password) {
          loginModalLoading.value = true;
          axios.post('/api/authenticate', signinUser.value, { headers: { 'username': signinUser.value.email, 'password': signinUser.value.password } }
          ).then((res) => {
            loginModalLoading.value = false;
            const data = res.data;
            if (data.token) {
              user.value = data.userInfo;
              user.value.token = data.token
              store.commit('setUser', user.value);
              message.success("Welcome, " + user.value.username);
              router.push({
                path: '/'
              })
            } else {
              message.error(data.message);
            }
          }).catch((err) => {
            loginModalLoading.value = false;
            message.error(err.message);
          })
        } else {
          message.error("username and password is required");
        }
      }
      return {
        signinUser,
        user,
        onSubmit,
        loginModalLoading
      }
    }
  })
</script>

<style scoped>
  .login-form {
    width: 565px;
    height: 410px;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px 110px;
  }

  /* Log */
  .login-title {
    /* color: #fff; */
    text-align: center;
    margin: 50px 0 40px 0;
    font-size: 36px;
    font-family: Microsoft Yahei;
  }

  /* 登陆按钮 */
  .submit {
    height: 45px;
    font-size: 16px;
  }

  .forgot {
    float: right;
    font-size: 13px;
    margin-top: 5px
  }

  /* 用户登陆标题 */
  .title {
    margin-bottom: 30px;
    /* color: #fff; */
    font-weight: 550;
    font-size: 24px;
    font-family: Microsoft Yahei;
  }

  /* 输入框 */
  .inputBox {
    height: 45px;
  }

  .input-title {
    margin-bottom: 5px;
    font-size: 18px
  }

  /* 输入框内左边距50px */
  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 50px;
  }

  .signup {
    text-align: center;
  }
</style>