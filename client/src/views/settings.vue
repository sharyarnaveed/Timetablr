<script setup>
import UserName from '@/components/changeusername.vue';
import Password from "@/components/changepassword.vue";
import { ref } from 'vue';
import GoingBack from "@/components/backhomeComp.vue"
const currenttab=ref('Password');

const tabs={
    Password,
    UserName
}



</script>
<template>
    <main class="settingsMain">

   
<div class="topOption">
<GoingBack/>
</div>

  <div class="ChangeOptions">

    <button
    
    v-for=" (_,tab) in tabs"
    :class="['tab-button', { active: currenttab === tab }]"
    :key="tab" @click="currenttab=tab">
        {{ tab }}
        
    </button>
  </div>

  <component class="TheFormOpen" :is="tabs[currenttab]"></component>

</main>
</template>

<style scoped>
.settingsMain{
    /* border: 2px solid blue; */
    height: 100vh;
padding: 5px 10px;
}
.topOption{
    /* border:2px solid green; */
    height: 7%;
    display: flex;
    align-items: center;
}
.ChangeOptions{
    /* border: 2px solid red; */
    height: 10%;
    display: flex;
    align-items: end;
    justify-content: space-around;
}
.tab-button {
  /* padding: 6px 10px; */
  font-family: var(--majorfont);
  height: 70%;
  width: 40%;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: var(--skyblue);
  margin-bottom: -1px;
  margin-right: -1px;
  font-size: .9rem;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.TheFormOpen{
    /* border: 2px solid green; */
    height: 85%;
}

</style>
