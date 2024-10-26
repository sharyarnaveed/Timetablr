<template>
    <div class="addacourse">
        <h1>Add Courses</h1>
      <coursestable/>
    </div>
</template>

<script setup>
import coursestable from '@/components/coursestable.vue';
</script>

<style scoped>
.addacourse
{
    border: 2px solid red;
    height: 90vh;
    overflow-y: auto;
}
.addacourse h1
{
    margin: 10px 10px;
    font-size: 2rem;
    font-family: var(--majorfont);
    font-weight: 300;
}

</style>