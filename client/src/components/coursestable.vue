<template>
     <table>
        <tr>
          <th>Program Id</th>
          <th>Program Name</th>
          
        </tr>
        <tr v-for="(program, index) in gottenprogram" :key="program.program_id">

          <td>{{ program.program_id }}</td>
          <td>{{ program.program_name }}</td>
          <td><router-link :to="{name:'addcourseform',params:{id:program.program_id}}" >Add Course</router-link></td>
          <td><router-link :to="{name:'viewaddedcourses',params:{id:program.program_id}}" >View Courses</router-link></td>
        </tr>
      </table>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const gottenprogram=ref([]);
const getcategory=async()=>
{
  const getcateg=await axios.get("/api/admin/getprogramfromdb");
  gottenprogram.value=getcateg.data;
  
  // console.log(gottenprogram.value);
}
onMounted(()=>
{
  getcategory();
})
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  overflow-y: auto;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>