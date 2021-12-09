<template>
  <a-layout id="components-layout-demo-top-side-2">
    <my-header></my-header>
    <div id="v-content" v-bind:style="{minHeight: height+'px'}"><router-view/></div>
    <my-footer></my-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import MyHeader from '@/components/my-header.vue';
  import MyFooter from '@/components/my-footer.vue';
  export default defineComponent({
    name: 'app',
    components: {
      MyHeader,
      MyFooter
    },
    setup () {
      const height = ref(0); 
      onMounted(() => {
        height.value = document.documentElement.clientHeight - 140;
        window.onresize = () => { height.value = document.documentElement.clientHeight - 140 }
      }) 
      return {
        height
      }
    }
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
