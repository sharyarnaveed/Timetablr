<script setup>
import { RouterLink, RouterView } from "vue-router";


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
          
          <li @click="logout" class="asideoptions">
            <button  type="submit" class="optionslink" to="">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
    <section class="dashboardcon">
      <div class="dashtop"></div>
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

  border-radius: 5px;

  background-color: red;
}
.optionslink {
  font-size: 1.2rem;
  font-family: var(--font);
  border: 2px solid var(--light-blue);
  border-radius: 5px;
  color: black;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
}
.optionslink:hover {
  background-color: var(--light-blue);
  border: 2px solid red;
}
.dashboardcon {
  /* border: 2px solid green; */
  width: 80%;
}
.dashtop {
  /* border: 2px solid red; */
  height: 10%;
}
</style>
