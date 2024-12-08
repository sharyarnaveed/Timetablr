<template>
  <main class="loadmoremain">
    <GoingBack />

    <div class="notclasscon">
      <Otherclasscard
        v-for="notclass in notcurrentclass"
        :key="notclass.id"
        :notclass="notclass"
        class="comp"
      />
    </div>
  </main>
</template>

<script setup>
import api from "@/api";
import Otherclasscard from "@/components/otherclasscard.vue";
import { useTimetableStore } from "@/stores/timtable";
import { ref, onMounted } from "vue";
// import otherclasscard from '@/components/otherclasscard.vue';
import GoingBack from "@/components/backhomeComp.vue";
const timetable = useTimetableStore();
const notcurrentclass = ref({});
const theday = ref({
  day: "",
});

const getdata = async (day) => {
  try {
    theday.value.day = day;
    const response = await api.post("/api/user/home", theday.value, {
      withCredentials: true,
    });
   
    return response.data.timetable;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};


onMounted(async () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  // console.log(dayName);
  const fetcheddata = await getdata(dayName);

  timetable.setClasses(fetcheddata);

  //   usetimetable.findCurrentClass();
  timetable.findnotcurrent();
  notcurrentclass.value = timetable.notcurrentclass;
  console.log("in load more",notcurrentclass.value);
});

//  console.log(nocurrentclass);
</script>

<style>
@media only screen and (max-width: 349px) {
  .notclasscon {
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    padding: 10px 15px;
    /* margin-top: -//px ; */
  }
  .loadmoremain {
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    display: flex;
    /* gap: 2%; */
    flex-direction: column;
    justify-content: space-evenly;
    /* align-items: center; */
  }
  .comp {
    /* border: 2px solid red; */
    margin: 10px 2px;
    height: 120px;
    padding: 10px 10px;
  }
  .router {
    /* border: 2px solid green; */
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
  }
  .backrouter {
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
    /* border: 2px solid blue; */
  }
}

@media only screen and (min-width: 350px) {
  .notclasscon {
    /* border: 2px solid red; */
    height: 100vh;
    overflow-y: auto;
    padding: 10px 15px;
    /* margin-top: -//px ; */
  }
  .loadmoremain {
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
  .comp {
    /* border: 2px solid red; */
    margin: 10px 2px;
    height: 120px;
    padding: 10px 10px;
  }
  .backrouter {
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
  }
  .router {
    /* border: 2px solid green; */
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
  }
  .backrouter {
    font-size: 1.1rem;
    font-family: var(--majorfont);
    color: black;
    /* border: 2px solid blue; */
  }
}
</style>
