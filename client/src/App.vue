<template>
  <a-layout id="components-layout-demo-top-side-2">
    <!-- <my-header></my-header> -->
    <router-view/>
    <!-- <my-footer></my-footer> -->
  </a-layout>
</template>

<script>
  import { defineComponent } from 'vue';
  // import MyHeader from '@/components/my-header.vue';
  // import MyFooter from '@/components/my-footer.vue';
  export default defineComponent({
    name: 'app',
    components: {
      // MyHeader,
      // MyFooter
    },
  });
</script>

<style>
.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
