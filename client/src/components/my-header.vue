<template>
  <a-layout-header class="header">
    <div class="logo">
      <router-link to="/" :style="{color: 'white'}">BufferOverflow</router-link>
    </div>
    <a-menu theme="dark" mode="horizontal" :default-selected-keys="['2']" :style="{ lineHeight: '64px' }">
      <a-menu-item key="1">
        Products
      </a-menu-item>
      <a-menu-item key="2">
        <!-- "vetur.validation.template": false -->
        <a-input-search v-model:value="search" placeholder="search..." style="width: 640px" @search="onSearch" />
        <a-button type="primary" @click="onSearch">Search</a-button>
      </a-menu-item>
      <a-menu-item key="3">
        <span v-show="user.id">
          <a-popover placement="bottom" trigger="click">
            <template v-slot:content>
              <p>Question</p>
              <p>Answer</p>
              <p>Message</p>
            </template>
            <template v-slot:title>
              <span>{{user.username}}</span>
              <a class='logout' @click="onLogout">log out</a>
            </template>
              <a-avatar shape="square" :size="small" style="color: #f56a00; backgroundColor: #fde3cf">
                USER
              </a-avatar>
          </a-popover>
        </span>
      
        <span v-show="!user.id">
          <a-button size="small" :style="{marginRight:'10px', width: '60px', height: '32px'}">
            <router-link to="/signin">
              Sign In
            </router-link>
          </a-button>
          <a-button size="small" type="primary" :style="{ width: '60px', height: '32px'}">
            <router-link to="/signup" :style="{color: 'white'}">Sign Up</router-link>
          </a-button>
        </span>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
  import { defineComponent, computed, ref } from 'vue';
  // import axios from 'axios';
  import { message } from 'ant-design-vue';
  import store from '@/store';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'my-header',
    setup() {
      const router = useRouter();
      // const that = this;
      
      const search = ref();

      const user = computed(() => store.state.user);

      const loginModalVisible = ref(false);
      const loginModalLoading = ref(false);
      const showLoginModal = () => {
        loginModalVisible.value = true;
      }

      const onLogout =function ()  {
        console.log('log out...');

        store.commit("setUser", {});
        message.success('Log Out');
        this.$router.push('/signin')
      }

      const onSearch = function () {
        console.log('/question/result/' + search.value);
        // this.$router.push('/question/result/' + search.value)
        router.push({
          path: '/question/result/' + search.value
        })
      }

      return {
        onLogout,
        user,
        loginModalVisible,
        loginModalLoading,
        showLoginModal,
        onSearch,
        search
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
.logout {
  float:right;
}
</style>