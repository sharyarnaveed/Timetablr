<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const addprogram=ref({
  programname:''
});
const gottenprogram=ref([]);

const submitcategory=async()=>
{
  // console.log(addprogram.value.programname);
try {
  if(addprogram.value.programname=="")
{
  console.log("empty");
}
else
{
  const responce=await axios.post("/api/admin/addprogram",addprogram.value);
  console.log(responce.data);
addprogram.value={
  programname:""
}
  if(responce.data)
{
  alert(responce.data.message);
  getcategory();
}

}


} catch (error) {
  console.log(error);
}
}



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

<template>
  <div class="categorycon">



    <form @submit.prevent="submitcategory"  class="addcategory">
      <input  v-model="addprogram.programname" type="text" name="" id="" />
      <button type="submit">Add Program</button>
    </form>

    <div class="alreadycategory">
      <table>
        <tr>
          <th>Program Id</th>
          <th>Program Name</th>
        </tr>
        <tr v-for="(program, index) in gottenprogram" :key="program.program_id">
          <td>{{ program.program_id }}</td>
          <td>{{ program.program_name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.categorycon {
  /* border: 2px solid yellow; */
  height: 90%;
}
.addcategory {
  /* border: 2px solid brown; */
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.addcategory input {
  width: 30%;
  height: 30%;
  font-size: 1rem;
  padding: 1px 10px;
  outline: none;
}

.addcategory button {
  width: 12%;
  font-size: 1rem;
  height: 30%;
}

.alreadycategory {
  /* border: 2px solid purple; */
  height: 70%;
  overflow-y: auto;
}

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
