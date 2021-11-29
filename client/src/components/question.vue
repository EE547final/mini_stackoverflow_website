<template>
  <div>
    <a-layout>
      <a-layout-sider width='100' :style="{ background: 'white' }">
        <div>
          <a-statistic title="votes" :value="100" style="margin-left: 30px; margin-top: 15px" />
          <a-statistic title="answers" :value="100" style="margin-left: 30px"/>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-card :loading="loading" title="Question title" @click="enterQuestionDetail" >
          Question Content
          <div>
            <a-tag color="orange" :style="{ marginTop: '10px' }">
              tag1
            </a-tag>
            <a-tag color="orange" @click="enterTag">
              tag2
            </a-tag>
          </div>
        </a-card>
        <!-- <a-card>
          
        </a-card> -->
        
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
  export default {
    setup() {
      const enterQuestionDetail = () => {
        console.log('111');
      }
      const enterTag = () => {
        console.log("222");
      }
      return {
        enterQuestionDetail,
        enterTag
      }
    }
  };
</script>