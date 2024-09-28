<script setup>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import router from "@/router";
import adminaside from "@/components/adminsidemenu.vue"
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
   <adminaside/>
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

.dashboardcon {
  /* border: 2px solid green; */
  width: 80%;
}
.dashtop {
  /* border: 2px solid red; */
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
