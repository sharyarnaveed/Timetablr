<script setup>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import router from "@/router";
const logout=async()=>
{
  const thelog= await axios.post("/api/admin/adminlogut")

if(thelog.data.success)
{
  router.push("/adminthesignin")
}

}


</script>
<template>
  <main class="adminmain">
    <aside class="aside">
      
      <div class="options">
        <ul class="optioncoono">
          <!-- <li class="asideoptions">
             <router-link class="optionslink" to="/adminhome">Home</router-link> 
          </li> -->
          
          
          <li class="asideoptions">
            <router-link class="optionslink" to="/totheadmindashboard/addcategory"
              >Add Category</router-link
            >
          </li>
          <li class="asideoptions">
            <router-link class="optionslink" to="/totheadmindashboard/addtimetable"
              >Add Timetable</router-link
            >
          </li>
          
          <li @click="logout" class="asideoptions">
            <button  type="submit" class="optionslink" to="">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
    <section class="dashboardcon">
      <div class="dashtop">
        <h1>WELCOME TO ADMIN PANEL</h1>
      </div>
      <RouterView />
    </section>
  </main>
</template>

<style>
.adminmain {
  /* border: 2px solid red; */
  height: 100vh;
  display: flex;
}
.aside {
 border: 2px solid rgb(0, 0, 0); 
  width: 20%;
}
.logo {
  /* border: 2px solid blue; */
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  /* border: 2px solid red; */
  height: 50%;
  width: 50%;
}
.icon svg {
  width: 100%;
  height: 100%;
}
.options {
  /* border: 2px solid purple; */
  height: 80%;
}
.optioncoono {
  /* border: 2px solid green; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.asideoptions {
  list-style: none;
  height: 10%;
  width: 90%;
  background-color: var(--skyblue);
  border-radius: 5px;

  /* background-color: red; */
}
.optionslink {
  font-size: 1.2rem;
  font-family: var(--font);
  border: 2px solid var(--violet);
  border-radius: 5px;
  color: black;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
}
.optionslink:hover {
  background-color: var(--violet);
  /* border: 2px solid red; */
}
.dashboardcon {
  /* border: 2px solid green; */
  width: 80%;
}
.dashtop {
  border: 2px solid red;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.dashtop h1
{
  font-family: var(--majorfont);
}
</style>
