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
          <a-form 
            :form="form" 
            :model="question"
            :rules="rules"
          >
            <div class="label">Title</div>
            <a-form-item  class="input" name="title">
              <a-input v-model:value="question.title" size="large" placeholder="Please input title" />
            </a-form-item>
            <div class="label">Tags</div>
            <a-form-item class="input" name="tags">
              <a-input v-model:value="question.tags" size="large" placeholder="Please input tags" />
            </a-form-item>
            <div class="label">Body</div>
            <a-form-item>
              <div class="input-body">
                <div id="content" :innerHTML="body"></div>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button size="large" @click="onSubmit" type="primary" :style="{width: '200px'}" >Post your question</a-button>
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
  import { onMounted, ref } from 'vue'
  import { message } from 'ant-design-vue';
  import E from 'wangeditor'
  import axios from 'axios';
  import store from '@/store';
  import { useRouter } from 'vue-router';
  import i18next from 'i18next';

  export default {
    name: 'question-ask',
    components: {
      MySider,
      Reminder
    },
    setup() {
      // form rules
      const rules = {
        title: [{
          required: true,
          message: 'Please input title',
          trigger: 'blur',
        }, {
          min: 3,
          max: 200,
          message: 'Title length should be 3 to 200',
          trigger: 'blur',
        }],
        tags: [{
          required: true,
          message: 'Please input tags and separate each tag with commas',
          trigger: 'blur',
        }]
      };

      const router = useRouter();

      // editor 
      const editor = new E('#content')
      const question = ref({
        title: '',
        tags: '',
      })
      const body = ref();
      body.value = {}

      

      const onSubmit = () => {
        console.log('posting question...');
        body.value = editor.txt.html();
        axios.post('/api/questions', {text: body.value }, {headers: {'user': store.state.user, title: question.value.title, tags: question.value.tags}}).then(res => {
          const data = res.data;
          if(data._id) {
            message.success("Successfully Post");
            router.push({
              path: '/question/'+data._id
            })
          }
        })
      }

      onMounted(() => {
        editor.config.height = 200
        editor.config.lang = 'en'
        editor.i18next = i18next
        editor.create()
      })
      
      return {
        editor,
        question,
        onSubmit,
        rules,
        body
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
    width: 80%;
  }
  .input-body{
    margin-left: -48px;
    margin-right: 88px;
  }
</style>