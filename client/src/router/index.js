import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import QuestionList from "../views/Question-list.vue";
import QuestionDetail from "../views/Question-detail.vue"
import Login from "../views/login.vue"


const routes = [
  {
    path: "/",
    name: "QuestionList",
    component: QuestionList,
  },
  {
    path: "/question/:id",
    name: "QuestionDetail",
    component: QuestionDetail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/questionlist",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
