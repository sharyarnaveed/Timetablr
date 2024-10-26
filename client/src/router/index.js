import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from "@/views/signup.vue"
import Signin from "@/views/signin.vue"
import Panehome from '@/views/panehome.vue'
import Loadmore from '@/views/loadmore.vue'
import adminsignin from "@/views/admin/signin.vue"
import admindashboard from "@/views/admin/dashboard.vue"
import addcategory from "@/views/admin/addcategory.vue"
import addtimetable from "@/views/admin/addtimetabele.vue"
import AddTeacher from '@/views/admin/AddTeacher.vue'
import adminhome from "@/views/admin/adminhome.vue"
import Settings from '@/views/settings.vue'
import AddCourse from "@/views/admin/AddCourse.vue"
import addcourseform from "@/views/admin/addcourseform.vue"
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
  },
  {
    path:"/home",
    name:"panelhome",
    component:Panehome
  },
  {
    path:"/loadall",
    name:"loadall",
    component:Loadmore
  },
  {
    path:"/adminthesignin",
    name:"adminsignin",
    component:adminsignin
  },
  {
    path:"/settings",
    name:"settings",
    component:Settings
  }
,{
  path:"/totheadmindashboard",
  name:"admindashboard",
  component:admindashboard,
  children:[
 {
path:"",
component:adminhome
 },

    {
      path:"addcategory",
      component:addcategory
    },
    {
      path:"addtimetable",
      component:addtimetable
    },
    {
      path:"addteacher",
      component:AddTeacher
    },
    {
      path:"addcourse",
      component:AddCourse
    }
    ,{
      path:"addcourseform/:id",
      name:"addcourseform",
      props:true,
      component:addcourseform
    }
  ]
}



  ]
})

export default router
