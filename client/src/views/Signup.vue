<template>
  <div>
    <h2 class="login-title">BufferOverflow</h2>
    <a-spin tip="Loading" :spinning="signupModalLoading">
      <a-form ref="form" :model="form" class="login-form">
        <h2 class="title">WELCOME</h2>
        <a-form-item>
          <div class="input-title">Username</div>
          <a-input v-model:value="signupUser.email">
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="input-title"><span>Password</span> </div>
          <a-input-password v-model:value="signupUser.password">
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div class="input-title"><span>Confirm Password</span> </div>
          <a-input-password v-model:value="signupUser.confirmPassword">
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button size="large" @click="onSubmit" type="primary" block>Sign Up</a-button>
        </a-form-item>
        <div class="signup">Already have an acoount?
          <router-link to="/signin">Sign In</router-link>
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
    name: 'Signup',
    components: {
    },
    setup() {
      const router = useRouter();

      // signup info input by user
      const signupUser = ref({
        email: "",
        password: "",
        confirmPassword: ""
      })

      // user info from server
      const user = ref({});

      // state control variables
      const signupModalLoading = ref(false);

      // sign up. if success, sign in immediately
      const onSubmit = () => {
        console.log('sign up started...');
        if(signupUser.value.password !== signupUser.value.confirmPassword) {
          message.error('The two passwords you typed do not match.');
          return;
        }
        if (signupUser.value.email && signupUser.value.password) {
          signupModalLoading.value = true;
          axios.post('/api/signup', signupUser.value, { headers: { 'username': signupUser.value.email, 'password': signupUser.value.password } }
          ).then((res) => {
            const data = res.data;
            if (data.success) {
              user.value = data.userInfo;
              message.success("Successfully signed up");
            } else {
              message.error(data.message);
            }
          }).then((res) => {
            console.log(res);
            const tempUser = {
              username: user.value.username,
              password: signupUser.value.password
            }
            axios.post('/api/authenticate', tempUser, {
              headers: { 'username': tempUser.username, 'password': tempUser.password}
            }).then(res => {
              signupModalLoading.value = false;
              const data = res.data;
              if (data.success) {
                user.value = data.userInfo;
                store.commit('setUser', user.value);
                message.success("Welcome, " + user.value.username);
                router.push({
                  path: '/'
                })
              } else {
                message.error(data.message);
              }
            }).catch((err) => {
              signupModalLoading.value = false;
              message.error(err.message);
            })
          }).catch((err) => {
            signupModalLoading.value = false;
            message.error(err.message);
          })
        } else {
          message.error("username and password is required");
        }
      }

      return {
        signupUser,
        onSubmit,
        signupModalLoading
      }
    }
  })
</script>

<style scoped>
  .login-form {
    width: 565px;
    height: 500px;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px 110px;
  }

  /* 背景 */
  .login-container {
    /* position: absolute; */
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    background-size: 100% 100%;
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
    width: 100%;
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