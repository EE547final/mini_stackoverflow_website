<template>
  <div>
    <a-layout>
      <a-layout-sider width='100' :style="{ background: 'white' }">
        <div>
          <a-statistic title="votes" :value="(question.votes.length)" style="margin-left: 30px; margin-top: 15px" />
          <a-statistic title="answers" :value="(question.answers.length)" style="margin-left: 30px"/>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-card :loading="loading" :title="(question.title)">
          <router-link :to="'/question/'+question._id" :style="{color: 'black'}">
            <div v-html="text"></div>
          </router-link>
          <div>
            <a-tag v-for = '(tag,index) in question.tags' :key="index" color="orange" :style="{ marginTop: '10px' }">
              {{tag}}
            </a-tag>
          </div>
        </a-card>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
  export default {
    props: {
      question: Object
    },
    setup(props) {
      console.log('----------');
      console.log(props.question.text);
      const text = props.question.text.split('</p>')[0]+' ...'+'</p>';
      const enterTag = () => {
        console.log("222");
      }
      return {
        enterTag,
        text,
      }
    }
  };
</script>