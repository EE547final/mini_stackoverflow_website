<template>
  <a-layout-sider width="300">
    <a-menu mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']"
      :style="{ height: '100%', borderRight: 0 }">
      <a-sub-menu key="sub1">
        <template v-slot:title>
          <span>
            <a-icon type="user" />1. Summarize the problem
          </span>
        </template>
        <a-menu-item key="1">
          Include details about your goal
        </a-menu-item>
        <a-menu-item key="2">
          Describe expected and actual results
        </a-menu-item>
        <a-menu-item key="2">
          Include any error messages
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <span>
            <a-icon type="laptop" />2. Describe what you've tried
          </span>
        </template>
        <a-menu-item key="4">
          Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can
          get better answers when you provide research.
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template v-slot:title>
          <span>
            <a-icon type="notification" />3. Show some code
          </span>
        </template>
        <a-menu-item key="5">
          When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum,
          reproducible example)
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'my-sider',
    setup() {
      
    }
  })

</script>