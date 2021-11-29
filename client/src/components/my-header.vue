<template>
  <a-layout-header class="header">
    <div class="logo">StackOverflow</div>
    <a-menu theme="dark" mode="horizontal" :default-selected-keys="['2']" :style="{ lineHeight: '64px' }">
      <a-menu-item key="1">
        Products
      </a-menu-item>
      <a-menu-item key="2">
        <a-input-search placeholder="search..." style="width: 870px" @search="onSearch" />
      </a-menu-item>
      <a-menu-item key="3">
        <a-avatar 
          shape="square" 
          :size="small" 
          style="color: #f56a00; backgroundColor: #fde3cf"
          v-show="user.id"
        >
          USER
        </a-avatar>
        <span v-show="!user.id">
          <a-button size="small" :style="{marginRight:'10px', width: '60px', height: '32px'}">Log in</a-button>
          <a-button size="small" type="primary" :style="{ width: '60px', height: '32px'}">Sign up</a-button>
        </span>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  // import axios from 'axios';
  import { message } from 'ant-design-vue';
  // import store from '@/store';

  export default defineComponent({
    name: 'my-header',
    setup() {
      //user and loginuser are mock data
      const user = {
        
        name: 'test'
      }
      const loginUser = ref({
        loginName: 'test',
        password: 'test'
      })

      const loginModalVisible = ref(false);
      const loginModalLoading = ref(false);
      const showLoginModal = () => {
        loginModalVisible.value = true;
      }

      const login = () => {
        console.log('login......');
        loginModalLoading.value = true;
        //TODO: login here
        loginModalVisible.value = false;
        message.success("Welcome!");
      }

      const logout = () => {
        console.log('logout......');
      }

      return {
        login,
        logout,
        user,
        loginUser,
        loginModalVisible,
        loginModalLoading,
        showLoginModal,
      }
    }
  })

</script>

<style>
.logo {
  width: 120px;
  height: 31px;
  color: white;
  font-size: 18px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0) !important;
  line-height: 30px !important;
}
.login-menu {
  float: right;
  color: white;
  padding-left: 10px;
}
</style>