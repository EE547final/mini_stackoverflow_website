<template>
  <a-layout-sider width="200">
    <a-menu mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']"
      :style="{ height: '100%', borderRight: 0 }">
      <a-sub-menu key="sub1">
        <template v-slot:title>
          <span>
            <a-icon type="user" />Questions
          </span>
        </template>
        <a-menu-item key="1">
          option1
        </a-menu-item>
        <a-menu-item key="2">
          option2
        </a-menu-item>
        <a-menu-item key="3">
          option3
        </a-menu-item>
        <a-menu-item key="4">
          option4
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <span>
            <a-icon type="laptop" />Users
          </span>
        </template>
        <a-menu-item key="5">
          option5
        </a-menu-item>
        <a-menu-item key="6">
          option6
        </a-menu-item>
        <a-menu-item key="7">
          option7
        </a-menu-item>
        <a-menu-item key="8">
          option8
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template v-slot:title>
          <span>
            <a-icon type="notification" />Tags
          </span>
        </template>
        <a-menu-item key="9">
          option9
        </a-menu-item>
        <a-menu-item key="10">
          option10
        </a-menu-item>
        <a-menu-item key="11">
          option11
        </a-menu-item>
        <a-menu-item key="12">
          option12
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