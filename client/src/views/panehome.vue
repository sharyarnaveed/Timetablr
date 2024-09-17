<script setup>
import infocard from "@/components/infocard.vue";
import otherclass from "@/components/otherclasscard.vue";
import { useTimetableStore } from "@/stores/timtable";
import api from "@/api";
import { onMounted, ref } from "vue";
import router from "@/router";
import axios from "axios";
const usetimetable = useTimetableStore();
const Currentclassfront = ref({});

const theday = ref({
  day: "",
});
const getdata = async (day) => {
  // console.log(day);
  theday.value.day = day;
  console.log(theday.value.day);
  const responce = await api.post("/api/user/home", theday.value, {
    withCredentials: true,
  });
  // console.log(responce.data);
  return responce.data;
};

// for the logout
const logout = async () => {
  const thelog = await axios.post("/api/user/logout");

  if (thelog.data.success) {
    router.push("/signin");
  }
};




onMounted(async () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  // console.log(dayName);

  const fetcheddata = await getdata(dayName);
  usetimetable.setClasses(fetcheddata);

  usetimetable.findCurrentClass();
});
</script>
<template>
  <main class="homepanelmain">
    <div class="hometop">
      <button @click="logout" class="logout">
        <img src="../assets/material-symbols_logout.svg" alt="" />
      </button>
    </div>

    <div class="headingandcurrent">
      <h1>TimeTablr</h1>

      <div class="currentconoutisde">
        <h4>Current</h4>

        <infocard v-if="usetimetable.currentClass" />
        <h2 class="noclasstext" v-else>No Class Right Now</h2>
      </div>
    </div>

    <div class="bottomtable">
      <div class="loadall">
        <router-link class="loadallrouterlink" to="/loadall"
          >Load All -></router-link
        >
      </div>

      <div class="laterconn">
        <otherclass />
        <otherclass />

        <!-- <infocard/> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
@media only screen and (max-width: 349px) {
  .noclasstext {
    font-family: var(--majorfont);
  }
  .logout {
    /* border: 2px solid pink; */
    background-color: transparent;
    border: none;
    width: 12%;
    height: 100%;
  }
  .logout img {
    height: 78%;
  }
  .homepanelmain {
    /* border: 2px solid red; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 10px;
    height: 100vh;
  }
  .hometop {
    /* border: 2px solid purple; */
    height: 8%;
    display: flex;
    justify-content: end;

    align-items: center;
  }
  .headingandcurrent {
    /* border: 2px solid blue; */
    height: 40%;
    padding: 2px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .headingandcurrent h1 {
    font-size: 1.9rem;
    font-family: var(--majorfont);
    font-weight: 400;
  }
  .currentconoutisde {
    /* border: 2px solid brown; */
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }

  .currentconoutisde h4 {
    font-size: 1.1rem;
    font-family: var(--majorfont);
  }

  .laterconn {
    /* border: 2px solid purple; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .bottomtable {
    /* border: 2px solid purple; */
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  .loadall {
    /* border: 2px solid red; */
    height: 10%;
  }

  .loadallrouterlink {
    font-size: 1.1rem;
    color: black;
    font-family: var(--majorfont);
    display: flex;
    justify-content: end;
  }

  .speeddiler {
    border: 2px solid red;
    height: 35%;
  }
}

@media only screen and (min-width: 350px) {
  .noclasstext {
    font-family: var(--majorfont);
  }
  .logout {
    /* border: 2px solid pink; */
    width: 10%;
    border: none;
    background-color: transparent;
    /* border: none; */
    height: 100%;
  }
  .logout img {
    height: 78%;
  }
  .homepanelmain {
    /* border: 2px solid red; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 10px;
    height: 100vh;
  }
  .hometop {
    /* border: 2px solid purple; */
    height: 8%;
    display: flex;
    justify-content: end;

    align-items: center;
  }
  .headingandcurrent {
    /* border: 2px solid blue; */
    height: 40%;
    padding: 2px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .headingandcurrent h1 {
    font-size: 1.9rem;
    font-family: var(--majorfont);
    font-weight: 400;
  }
  .currentconoutisde {
    /* border: 2px solid brown; */
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }

  .currentconoutisde h4 {
    font-size: 1.1rem;
    font-family: var(--majorfont);
  }

  .laterconn {
    /* border: 2px solid purple; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .bottomtable {
    /* border: 2px solid purple; */
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  .loadall {
    /* border: 2px solid red; */
    height: 10%;
  }

  .loadallrouterlink {
    font-size: 1.1rem;
    color: black;
    font-family: var(--majorfont);
    display: flex;
    justify-content: end;
  }

  .speeddiler {
    border: 2px solid red;
    height: 35%;
  }
}

@media only screen and (min-width: 576px) {
  .logout {
    /* border: 2px solid pink; */
    background-color: transparent;
    width: 5%;
    height: 100%;
  }
  .logout img {
    height: 78%;
  }
  .homepanelmain {
    /* border: 2px solid red; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 10px;
    height: 100vh;
  }
  .hometop {
    /* border: 2px solid purple; */
    height: 8%;
    display: flex;
    justify-content: end;

    align-items: center;
  }
  .headingandcurrent {
    /* border: 2px solid blue; */
    height: 40%;
    padding: 2px 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .headingandcurrent h1 {
    font-size: 1.9rem;
    font-family: var(--majorfont);
    font-weight: 400;
  }
  .currentconoutisde {
    /* border: 2px solid brown; */
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
  }

  .currentconoutisde h4 {
    font-size: 1.1rem;
    font-family: var(--majorfont);
  }

  .laterconn {
    /* border: 2px solid purple; */
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .bottomtable {
    /* border: 2px solid purple; */
    height: 50%;
    display: flex;
    flex-direction: column;
  }
  .loadall {
    /* border: 2px solid red; */
    height: 10%;
  }

  .loadallrouterlink {
    font-size: 1.1rem;
    color: black;
    font-family: var(--majorfont);
    display: flex;
    justify-content: end;
  }

  .speeddiler {
    border: 2px solid red;
    height: 35%;
  }
}
</style>
