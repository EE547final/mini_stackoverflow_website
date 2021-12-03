<template>
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, sequi saepe adipisci quod facere ipsa praesentium maiores quidem esse inventore illo voluptate, veniam dolor eaque. Laborum numquam exercitationem quia nisi fugiat, aut, ab ullam recusandae delectus et, voluptatibus error. Voluptatibus odio provident ipsam distinctio fugit neque. Cumque, distinctio exercitationem consectetur autem animi eius ut sunt quas amet? Earum quaerat, et sunt, possimus accusantium voluptatum labore nobis illo unde quis enim distinctio fugit cumque aut ex amet eaque, ullam rerum omnis nostrum perferendis neque quo! Minus, id inventore necessitatibus eaque porro iusto amet dolores nesciunt voluptatum, quae et, veniam cum dolor dolore. Natus consequuntur reiciendis inventore autem ducimus sapiente dicta, ea eveniet? Cupiditate similique in voluptatem est, possimus recusandae incidunt delectus dicta dolore doloremque illum minus. Optio maxime facere omnis tenetur est dolor corrupti eligendi cumque voluptas! Unde modi mollitia officia autem porro, nemo natus. Ut, et ea, vel exercitationem veniam aut laudantium numquam, inventore nisi itaque dolorum! Error vel ad debitis autem quae deserunt ipsa consequatur tempora veniam sunt esse nulla reprehenderit odit similique numquam iure tenetur animi nihil adipisci accusantium perferendis quasi, expedita officiis. Atque pariatur impedit veniam id repudiandae debitis veritatis nostrum, praesentium vero vel enim doloribus fugit.
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
</style>