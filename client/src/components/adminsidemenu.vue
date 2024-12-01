<template>
  <aside class="aside">
    <div class="logo">
      <h1><b>Timetablr</b></h1>
    </div>
    <ul class="optioncoono">
      <li class="asideoptions">
        <router-link class="optionslink" to="/totheadmindashboard">
          <img src="@/assets/dashboard.svg" alt="" />
          Dashboard</router-link
        >
      </li>

      <li class="asideoptions">
        <button @click="toggle" style="cursor: pointer" class="optionslink">
          <img src="@/assets/class.svg" alt="" /> Add Info
        </button>
        <div v-show="dropdown" class="dropdown-container">
          <router-link class="dropdown" to="/totheadmindashboard/addcategory">
            Add Class</router-link
          >
          <router-link class="dropdown" to="/totheadmindashboard/teacher">
             Teacher</router-link
          >
          <router-link class="dropdown" to="/totheadmindashboard/addcourse">
            Add Course</router-link
          >
          <router-link class="dropdown" to="/totheadmindashboard/addVenu">
            Add Class Rooms</router-link
          >

          <router-link class="dropdown" to="/totheadmindashboard/addtimetable">
            View Timetable</router-link
          >
        </div>
      </li>

      <li class="asideoptions">
        <button @click="generatetimetable" class="optionslink">
          <img src="@/assets/people.svg" alt="" />
          Gen Timetable</button>
      </li>

      <li @click="logout" class="asideoptions">
        <button style="cursor: pointer" type="submit" class="optionslink" to="">
          Log Out
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const dropdown = ref(false);

function toggle() {
  dropdown.value = !dropdown.value;
}

const generatetimetable=async()=>
{
try {
  
  const responce=await axios.post("/api/admin/generate");
  console.log(responce.data);
} catch (error) {
  console.log("cant generate timetable");
}
}



</script>

<style scoped>
.aside {
  /* border: 2px solid green; */
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.logo {
  /* border: 2px solid purple; */
  height: 20%;
}
.optioncoono {
  height: 80%;
  /* border: 2px solid blue; */
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
  font-family: var(--majorfont);
  border: 2px solid var(--violet);
  border-radius: 5px;
  color: black;
  width: 100%;
  display: flex;
  z-index: -1;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
}
.optionslink:hover {
  background-color: var(--violet);
  /* border: 2px solid red; */
}
.optionslink {
  /* border: 2px solid red; */
  display: flex;
  gap: 5%;
  font-size: 1.3rem;
  text-decoration: none;
}
.dropdown-container {
  /* border: 2px solid green; */
  position: relative;
  z-index: 2;
  justify-content: space-around;
  height: 240px;
  background-color: rgba(0, 0, 0, 0.404);
  display: flex;
  flex-direction: column;
  padding: 3px 8px;
}
.dropdown {
  /* border: 2px solid blue; */
  /* z-index: 2; */
  height: 20%;
  display: flex;
  text-decoration: none;
  color: black;
  margin: 5px 2px;
  font-family: var(--majorfont);
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  border-radius: 5px;
  background-color: var(--skyblue);
}

.dropdown:hover {
  background-color: var(--violet);
}
.logo
{
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo h1
{
  font-family: var(--majorfont);
    font-size: 2.2rem;
    font-weight: 300;
}
</style>
