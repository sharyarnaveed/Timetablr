<template>
     <div  class="message">
    <h1>{{ messagevalue }}</h1>
  </div>
</template>

<script setup>
defineProps({messagevalue:String});
</script>
<style scoped>

.message {
    /* border: 2px solid purple; */
    height: 80px;
    margin: 15px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    font-family: var(--majorfont);
    background-color: green;
    color: aliceblue;
  }
</style>
