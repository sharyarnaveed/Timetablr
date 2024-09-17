<template>
  <div class="currentconn">
    <h5 id="subject">
      Subject:
      <p>{{ subject }}</p>
    </h5>
    <h5>
      Venu:
      <p>{{ venu }}</p>
    </h5>
    <h5>
      Time:
      <p>{{ convstartime }} - {{ convendtime }}</p>
    </h5>
  </div>
</template>

<script setup>
import { useTimetableStore } from "@/stores/timtable";
import { onMounted, ref } from "vue";
const currentclass = ref({});
const subject = ref("");
const venu = ref("");
const starttime = ref(0);
const endtime = ref(0);
const convstartime = ref("");
const convendtime = ref("");

const converttime = (time) => {
  const totalMinutes = time * 60 * 24;

  // Get hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  let minutes = Math.floor(totalMinutes % 60);
  if (minutes == 0) {
    minutes = "00";
  }
  // console.log(`${hours} hours and ${minutes} minutes`);
  return `${hours}:${minutes}`;
  // console.log(time);
};

onMounted(() => {
  const timetable = useTimetableStore();
  currentclass.value = timetable.currentClass;
  // console.log(currentclass.value.subject);
  subject.value = currentclass.value.subject;
  venu.value = currentclass.value.venu;
  starttime.value = currentclass.value.start_time;
  endtime.value = currentclass.value.end_time;
  convstartime.value = converttime(starttime.value);
  convendtime.value = converttime(endtime.value);
});
</script>

<style scoped>
.currentconn {
  /* border: 2px solid red; */
  height: 79%;
  padding: 0px 3px;
  border-radius: 10px;
  background-color: var(--skyblue);
}
.currentconn h5 {
  font-size: 1.1rem;
  /* border: 2px solid green; */
  width: 100%;
  height: 20%;
  display: flex;
  font-family: var(--majorfont);
  align-items: center;
  justify-content: space-between;
}
.currentconn p {
  width: 80%;
  /* border: 2px solid black; */
  font-size: 1rem;

  font-weight: 400;
  font-family: var(--majorfont);
}

.laterconn {
  /* border: 2px solid blue; */
  height: 100%;
}

#subject {
  min-height: 55%;
  /* max-height: 40%; */
}
#subject p {
  height: 100%;
  align-items: center;
  padding: 1px 2px;
  /* justify-content: space-between; */
  display: flex;
  font-size: 1rem;
  padding: 0px 4px;
}

@media only screen and (min-width: 576px) {
  #subject p {
    height: 100%;
    align-items: center;
    padding: 1px 2px;
    /* justify-content: space-between; */
    display: flex;
    font-size: 1.3rem;
    padding: 0px 4px;
  }
  .currentconn h5 {
    font-size: 1.4rem;
    /* border: 2px solid green; */
    width: 100%;
    height: 20%;
    display: flex;
    font-family: var(--majorfont);
    align-items: center;
    justify-content: space-between;
  }
  .currentconn p {
    width: 80%;
    /* border: 2px solid black; */
    font-size: 1.3rem;

    font-weight: 400;
    font-family: var(--majorfont);
  }
}
</style>
