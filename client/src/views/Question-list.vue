<template>
  <a-layout id="components-layout-demo-top-side-2">
    <MyHeader></MyHeader>
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
            <question></question>
            <question></question>
            <question></question>
            <question></question>
          </a-space>
          <a-pagination show-quick-jumper :default-current="2" :total="100" @change="onChange" :style="{marginTop: '30px'}"/>
        </a-layout-content>
      </a-layout>
      <my-sider></my-sider>
    </a-layout>
    <MyFooter></MyFooter>
  </a-layout>
</template>
<script>
  import question from '../components/question.vue';
  import MyHeader from '../components/my-header.vue';
  import MyFooter from '../components/my-footer.vue';
  import MySider from '../components/my-sider.vue';

  export default {
    name: 'question-list',
    components: {
      question,
      MyHeader,
      MyFooter,
      MySider
    },
    setup() {
      const enterQuestionDetail = () => {
        console.log('111');
      }
      return {
        enterQuestionDetail
      }
    },
    
    // data() {
    //   return {
    //     collapsed: false,
    //   };
    // },
  };
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