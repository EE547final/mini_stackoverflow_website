<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <my-sider></my-sider>
      <a-layout :style="{padding: '0 24px 24px'} ">
        <a-layout-content >
          <a-card style="width: 100%">
            <div v-if="question">
              <div class="toparea">
                <div class="toptitle">
                  {{question.title}}
                </div>
                <div class="topdetail">
                  <span class="topdetailitem">Asked: {{question.created.slice(0,10)}}</span>
                  <span class="topdetailitem">Active: {{question.created.slice(0,10)}}</span>
                  <span class="topdetailitem">Viewed: 14 times</span>
                </div>
              </div>
              <a-divider />
              <div class="content" >
                <div v-html="question.text"></div>
              </div>
            </div>
            <div v-if="showAnswer">
              <a-divider>{{question.answers.length}} Answer(s)</a-divider>
              <div
                v-for='(answer, index) in question.answers'
                :key="answer._id"
                class="content"
              >
                <!-- <div v-html="answer.text"></div>
                <div>answerd by: {{answer.author.username}}</div>
                <br>
                <br>
                <br> -->
                <a-card v-if="showState" :title="'answered by: ' + (answer.author.username)" style="width: 100%">
                  <div v-html="answer.text"></div>
                  <a 
                    class='logout' 
                    @click="onDelete(answer.id)"
                    v-if="answer.author._id === userInfo.id || userInfo.role === 'admin' "
                  >delete</a>
                  
                  <a-button 
                    :style="{marginRight: '20px'}"  
                    :type="(style1[index])" 
                    @click="onVote(answer.id, index)" 
                    shape="circle"
                    
                  >▲{{answer.votes.length}}</a-button>
                  <a-button :type="(style2[index])" @click="onUnvote(answer.id, index)" shape="circle">▼</a-button>
                </a-card>
              </div>
            </div>
            
            <a-divider>Your Answer</a-divider>
            <div id="content"></div>
            <a-button class="submit" @click="onSubmit" type="primary">Submit Answer</a-button>
          </a-card>
        </a-layout-content>
      </a-layout>
      <my-sider></my-sider>
    </a-layout>
  </a-layout>
</template>
<script>
  import { useRoute } from 'vue-router';
  import { onMounted, ref, defineComponent, nextTick } from 'vue' 
  import axios from 'axios';
  import MySider from '../components/my-sider.vue';
  import E from 'wangeditor'
  import i18next from 'i18next';
  // import { useRouter } from 'vue-router';
  import store from '@/store';
  import { message } from 'ant-design-vue';

  export default defineComponent( {
    name: 'question-detail',
    components: {
      MySider,
    },
    setup() {
      const editor = new E('#content');
      const route = useRoute();
      // const router = useRouter();

      const id = route.params.id;
      const userInfo =  store.state.user;
      const question = ref()
      const showAnswer = ref(false)
      const body = ref();
      body.value = {}

      // view control
      const style1 = ref(['default', 'default', 'default', 'default', 'default', 'default', 'default', 'default', 'default', 'default'])
      const style2 = ref(['default', 'default', 'default', 'default', 'default', 'default', 'default', 'default', 'default', 'default'])
      const showState = ref(true)
      const reloadButton = () => {
        showState.value = false;
        nextTick(() => {
          showState.value = true;
        })
      }

      const queryQuestion = (id) => {
        axios.get("/api/question/" + id).then(res => {
          const data = res.data;
          if (data.length !== 0) {
            console.log('-------------answer data==========');
            console.log(data);
            question.value = data;
            showAnswer.value = question.value.answers.length !== 0
            // showAnswer.value = true;
          }
        })
      }
      queryQuestion(id)

      const onVote = (id, index) => {
        style1.value[index] = style1.value[index] === 'default'? 'primary' : 'default';
        if(style1.value[index] === 'primary') {
          axios.get("/api/votes/upvote/"+ question.value.id+ "/" + id).then((res) => {
            question.value = res.data;
            reloadButton()
          })
        } else {
          axios.get("/api/votes/unvote/" + question.value.id + "/" + id).then((res) => {
            question.value = res.data;
            reloadButton()
          })
        }
        
      }

      const onUnvote = (id, index) => {
        style2.value[index] = style2.value[index] === 'default' ? 'primary' : 'default'
        axios.get("/api/votes/downvote/" + question.value.id + "/" + id).then(res => {
          question.value = res.data;
          console.log(question.value);
          reloadButton()
        })
      }

      const onSubmit = () => {
        body.value = editor.txt.html();
        axios.post("/api/answer/"+question.value.id, {text: body.value}).then(res => {
          const data = res.data;
          console.log('-------------answer data==========');
          console.log(data);
          location.reload()
          this.$router.go(0)
        })
      }

      const onDelete = (id) => {
        axios.delete("/api/answer/" + question.value.id + "/" + id).then(() => {
          message.success(("Answer is Deleted"))
          location.reload()
          this.$router.go(0)
        }).catch((err) => {
          message.error(err.message);
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
        showAnswer,
        onSubmit,
        onDelete,
        userInfo,
        style1,
        style2,
        onVote,
        onUnvote,
        showState
      }
    }
  });
</script>

<style>
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }

  .toparea {
    margin-left: 23px;
    margin-right: 23px;
    margin-top: 20px;
  }
  .toptitle {
    font-size: 30px;
  }
  .topdetail {
    margin-left: 25px;
    margin-top: 10px;
  }
  .topdetailitem {
    margin-right: 15px;
  }
  .content {
    font-size: 20px;
    margin-left: 48px;
    margin-right: 48px;
    margin-top: 20px;
  }
  .submit {
    margin-top: 15px;
    float: right;
    margin-right: 48px

  }
  #content {
    margin-left: 48px;
    margin-right: 48px
  }
</style>

<!-- <template>
  <a-layout id="components-layout-demo-top-side-2">
    <MyHeader></MyHeader>
    <a-layout>
      <my-sider></my-sider>
      <a-layout :style="{padding: '0 24px 24px'} ">
        <a-layout-content>
          <a-card style="width: 100%">
            <div class="toparea">
              <div class="toptitle">
                Question Title
              </div>
              <div class="topdetail">
                <span class="topdetailitem">Asked: today</span>
                <span class="topdetailitem">Active: today</span>
                <span class="topdetailitem">Viewed: 14 times</span>
              </div>
            </div>
            <a-divider />
            <div class="content">
              Question content:
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, sequi saepe adipisci quod facere
              ipsa praesentium maiores quidem esse inventore illo voluptate, veniam dolor eaque. Laborum numquam
              exercitationem quia nisi fugiat, aut, ab ullam recusandae delectus et, voluptatibus error. Voluptatibus
              odio provident ipsam distinctio fugit neque. Cumque, distinctio exercitationem consectetur autem animi
              eius ut sunt quas amet? Earum quaerat, et sunt, possimus accusantium voluptatum labore nobis illo unde
              quis enim distinctio fugit cumque aut ex amet eaque, ullam rerum omnis nostrum perferendis neque quo!
              Minus, id inventore necessitatibus eaque porro iusto amet dolores nesciunt voluptatum, quae et, veniam cum
              dolor dolore. Natus consequuntur reiciendis inventore autem ducimus sapiente dicta, ea eveniet? Cupiditate
              similique in voluptatem est, possimus recusandae incidunt delectus dicta dolore doloremque illum minus.
              Optio maxime facere omnis tenetur est dolor corrupti eligendi cumque voluptas! Unde modi mollitia officia
              autem porro, nemo natus. Ut, et ea, vel exercitationem veniam aut laudantium numquam, inventore nisi
              itaque dolorum! Error vel ad debitis autem quae deserunt ipsa consequatur tempora veniam sunt esse nulla
              reprehenderit odit similique numquam iure tenetur animi nihil adipisci accusantium perferendis quasi,
              expedita officiis. Atque pariatur impedit veniam id repudiandae debitis veritatis nostrum, praesentium
              vero vel enim doloribus fugit.
            </div>
            <a-divider>Your Answer</a-divider>
            <div id="content">

            </div>
          </a-card>
        </a-layout-content>
      </a-layout>
      <my-sider></my-sider>
    </a-layout>
    <MyFooter></MyFooter>
  </a-layout>
</template>
<script>
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue'
  import MySider from '../components/my-sider.vue';
  import MyHeader from '../components/my-header.vue';
  import MyFooter from '../components/my-footer.vue';
  import E from 'wangeditor'
  export default {
    name: 'question-detail',
    components: {
      MyHeader,
      MyFooter,
      MySider
    },
    setup() {
      const editor = new E('#content');
      const route = useRoute();
      onMounted(() => {
        console.log(route.params.id);
        editor.config.height = 200
        editor.create()
      })
    }
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

  .toparea {
    margin-left: 23px;
    margin-right: 23px;
    margin-top: 20px;
  }

  .toptitle {
    font-size: 30px;
  }

  .topdetail {
    margin-left: 25px;
    margin-top: 10px;
  }

  .topdetailitem {
    margin-right: 15px;
  }

  .content {
    margin-left: 48px;
    margin-right: 48px;
    margin-top: 20px;
  }

  #content {
    margin-left: 48px;
    margin-right: 48px
  }
</style> -->