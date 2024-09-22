<template>
  <div back class="currentconnlater">
    <h5 id="subject">
      Subject:
      <p>{{ prop.subject }}</p>
    </h5>
    <h5>
      Venu:
      <p>{{ venu }}</p>
    </h5>
    <h5>
      Time:
      <p>{{ starttimecard }}-{{ endtimecard }}</p>
    </h5>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const starttimecard = ref(0);
const endtimecard = ref(0);

const converttime = (time) => {
  const totalMinutes = time * 60 * 24;

  // Get hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  let minutes = Math.floor(totalMinutes % 60);
  if (minutes == 0) {
    minutes = "00";
  }

  return `${hours}:${minutes}`;
};

const prop = defineProps({
  subject: String,
  venu: String,
  starttime: String,
  endtime: String,
});

starttimecard.value = converttime(prop.starttime);
endtimecard.value = converttime(prop.endtime);
</script>

<style scoped>
.currentconnlater {
  /* border: 2px solid red; */
  height: 115px;
  padding: 0px 3px;
  border-radius: 10px;
  background-color: var(--violet);
}

.currentconnlater h5 {
  font-size: 1.1rem;
  /* border: 2px solid green; */
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--majorfont);
}
.currentconnlater p {
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
  height: 55%;
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

@media only screen and (min-width: 425px) {
  .currentconnlater h5 {
    font-size: 1.2rem;
    /* border: 2px solid green; */
    width: 100%;
    height: 20%;
    display: flex;
    margin: 3px 0px;
    justify-content: space-between;
    align-items: center;
    font-family: var(--majorfont);
  }

  #subject {
    height: 45%;
  }
  #subject p {
    height: 100%;
    align-items: center;
    padding: 1px 2px;
    /* justify-content: space-between; */
    display: flex;
    font-size: 1.1rem;
    padding: 0px 4px;
  }

  .currentconnlater p {
    width: 80%;
    /* border: 2px solid black; */
    font-size: 1.1rem;

    font-weight: 400;
    font-family: var(--majorfont);
  }
}

@media only screen and (min-width: 576px) {
  .currentconnlater h5 {
    font-size: 1.3rem;
    /* border: 2px solid green; */
    width: 100%;
    height: 20%;
    display: flex;
    margin: 3px 0px;
    justify-content: space-between;
    align-items: center;
    font-family: var(--majorfont);
  }

  #subject {
    height: 45%;
  }
  #subject p {
    height: 100%;
    align-items: center;
    padding: 1px 2px;
    /* justify-content: space-between; */
    display: flex;
    font-size: 1.2rem;
    padding: 0px 4px;
  }

  .currentconnlater p {
    width: 80%;
    /* border: 2px solid black; */
    font-size: 1.2rem;

    font-weight: 400;
    font-family: var(--majorfont);
  }
}
</style>
