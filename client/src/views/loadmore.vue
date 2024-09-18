<template>
    
    <main class="loadmoremain">
      <div class="router">

          <router-link class="backrouter" to="/home"><- Back</router-link>
      </div>
      
<div  class="notclasscon">

    <Otherclasscard v-for="notclass in notcurrentclass" :key="notclass.class_id" :notclass="notclass" class="comp"/>
    
  

</div>
    </main>
</template>

<script setup>
import api from '@/api';
import Otherclasscard from '@/components/otherclasscard.vue';
import { useTimetableStore } from '@/stores/timtable';
import { ref, onMounted } from 'vue';
// import otherclasscard from '@/components/otherclasscard.vue';

const timetable=useTimetableStore();
const notcurrentclass=ref({})
const theday = ref({
  day: "",
});



const getdata = async (day) => {
  // console.log(day);
  theday.value.day = day;
//   console.log(theday.value.day);
  const responce = await api.post("/api/user/home", theday.value, {
    withCredentials: true,
  });
  // console.log(responce.data);
  return responce.data;
};



onMounted(async()=>
{
    const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  // console.log(dayName);
    const fetcheddata = await getdata(dayName);

  timetable.setClasses(fetcheddata);

//   usetimetable.findCurrentClass();
timetable.findnotcurrent();
notcurrentclass.value=timetable.notcurrentclass
console.log(notcurrentclass.value);

})

//  console.log(nocurrentclass);

</script>

<style scoped>

@media only screen and (max-width: 349px) {
.notclasscon{
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    padding: 10px 15px;
    /* margin-top: -//px ; */
}
    .loadmoremain{
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    display: flex;
    /* gap: 2%; */
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center; */
}
.comp{
    /* border: 2px solid red; */
    margin: 10px 2px;
    height: 120px;
    padding: 10px 10px;
}
.router{
    
    /* border: 2px solid green; */
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
}
.backrouter
{
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
    /* border: 2px solid blue; */
}
}



@media only screen and (min-width: 350px) {

    .notclasscon{
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    padding: 10px 15px;
    /* margin-top: -//px ; */
}
.loadmoremain{
/* border: 2px solid red; */
height: 100vh;
overflow-y: auto;
display: flex;
/* gap: 2%; */
padding: 10px 15px;
flex-direction: column;
justify-content: space-evenly;
/* align-items: center; */
}
.comp{
/* border: 2px solid red; */
margin: 10px 2px;
height: 120px;
padding: 10px 10px;
}
.backrouter{
font-size: 1.1rem;
font-family: var(--majorfont);
color: black;
}
.router{
    
    /* border: 2px solid green; */
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
}
.backrouter
{
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
    /* border: 2px solid blue; */
}
}
</style>