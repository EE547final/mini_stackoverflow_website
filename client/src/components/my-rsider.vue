<template>
  <a-layout-sider width="200">
    <a-menu mode="inline" 
      :style="{ height: '100%', borderRight: 0 }">
      <div class="side-container">
        <div class="title">Popular Tags: </div>
        <a-tag v-for='(tag,index) in tags' :key="index" color="orange" :style="{ marginTop: '30px' }">
          {{tag}}
        </a-tag>
      </div>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'my-sider',
    setup() {
      const tags = ref();
      tags.value = new Set()
      const getTags = () => {
        axios.get("/api/tags").then(res => {
          for(let tag of res.data) {
            const tempTag = tag._id.split(',');
            tags.value.add(...tempTag);
          }
        })
      }
      onMounted(() => {
        getTags()
      })
      return {
        tags
      }
    }
  })

</script>

<style>
  .title {
    font-size: 20px
  }
  .side-container {
    background-color: #fff;
    margin-top:20px;
    margin-left: 23px;
  }
</style>