<template>
  <div class="currentconn">
    <h5 id="subject">
      Subject:
      <p>History and Theory of Architecture-II</p>
    </h5>
    <h5>
      Venu:
      <p>C2-SDT-CL1</p>
    </h5>
    <h5>
      Time:
      <p>12:00 - 12:30</p>
    </h5>
  </div>
</template>

<script setup>
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

.laterconn{
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

@media only screen and (min-width: 576px)
{
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
