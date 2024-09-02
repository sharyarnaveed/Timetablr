import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from "@/views/signup.vue"
import Signin from "@/views/signin.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
  {
    path:"/signup",
    name:"signup",
    component:Signup
  },
  {
    path:"/signin",
    name:"signin",
    component:Signin
  }
  ]
})

export default router
