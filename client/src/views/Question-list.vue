<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <my-sider></my-sider>
      <a-layout :style="{padding: '0 24px 24px'} ">
        <a-layout-content >
          <div class='toptitle'>
            <span >
              Top Questions
            </span>
            <a-button type="primary" :style="{float: 'right', marginTop: '10px'}">
              Ask Question
            </a-button>
          </div>
        </a-layout-content>
        <a-layout-content :style="{  padding: '24px', margin: 0, minHeight: '280px' }" >
          <a-space direction="vertical" :style="{width: '100%'}">
            <div 
              v-for = 'question in questions'
              :key="question._id"
            >
            <question
              :question="question"
            ></question>
              
            </div>
          </a-space>
          <a-pagination show-quick-jumper :default-current="2" :total="100" @change="onChange" :style="{marginTop: '30px'}"/>
        </a-layout-content>
      </a-layout>
      <my-sider></my-sider>
    </a-layout>
  </a-layout>
</template>
<script>
  import question from '../components/question.vue';
  import MySider from '../components/my-sider.vue';
  import axios from 'axios';
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    name: 'question-list',
    components: {
      question,
      MySider
    },
    setup() {
      const enterQuestionDetail = () => {
        console.log('111');
      };

      const questions = ref([])

      const queryQuestionList = () => {
        axios.get("/api/question").then(res => {
          const data = res.data;
          if(data.length !== 0) {
            questions.value = data;
          }
        })
      }

      onMounted( () => {
        queryQuestionList()
      });
      return {
        enterQuestionDetail,
        questions
      }
    },
    
  })
</script>

<style>
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
  
  .toptitle {
    font-size: 30px;
    margin-left: 23px;
    margin-right: 23px;
    margin-top: 20px;
  }
</style>