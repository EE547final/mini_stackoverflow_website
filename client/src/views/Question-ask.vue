<template>
  <a-layout>
    <my-sider></my-sider>
    <a-layout :style="{padding: '0 24px 24px'} ">
      <a-layout-content>
        <div class='toptitle'>
          <span>
            Ask a public question
          </span>
        </div>
        <div class="container">
          <a-form :form="form">
            <div class="label">Title</div>
            <a-form-item label="" class="input">
              <a-input size="large" placeholder="Please input title" />
            </a-form-item>
            <div class="label">Tags</div>
            <a-form-item label="" class="input">
              <a-input size="large" placeholder="Please input tags" />
            </a-form-item>
            <a-form-item>
              <div class="label">Body</div>
              <div class="input-body"><div id="content"></div></div>
            </a-form-item>
          </a-form>
        </div>
        
      </a-layout-content>
      <a-layout-content :style="{  padding: '24px', margin: 0, minHeight: '280px' }">
        
      </a-layout-content>
    </a-layout>
    <reminder></reminder>
  </a-layout>
</template>

<script>
  import MySider from '../components/my-sider.vue';
  import Reminder from '../components/side-reminder.vue';
  import { onMounted } from 'vue'
  import E from 'wangeditor'

  export default {
    name: 'question-ask',
    components: {
      MySider,
      Reminder
    },
    setup() {
      const editor = new E('#content');
      onMounted(() => {
        editor.config.height = 200
        editor.create()
      })
      return {
        editor
      }
    }
    
  }
</script>

<style>
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    background-size: 100% 100%;
    margin: 0
  }
  .container {
    background-color: #f0f2f5;
    margin-top:20px;
    margin-left: 23px;
  }
  .label {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .input {
    width: 900px;
  }
  .input-body{
    margin-left: -48px;
    margin-right: 188px;
  }
</style>