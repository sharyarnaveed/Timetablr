<template>
    <div>
{{ prop.id }}
    </div>

    <table>
        <tr>
          <th>Courses Id</th>
          <th>Courses Name</th>
          
        </tr>
        <tr v-for="(program, index) in fetchedcourses" :key="program.program_id">

          <td>{{ program.course_id }}</td>
          <td>{{ program.course_name }}</td>
          <td><button @click="deletecourse(program.course_id)">Delete</button></td>
        </tr>
      </table>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const prop=defineProps({
    id:String
})

// for deleting courses

async function deletecourse(courseid)
{
    
    console.log(courseid);
    try {
const check= confirm("Do you wanna delete it?")
console.log(check);
if(check==true)
{
    const responce=await axios.post("/api/admin/deletecourse",{courseid}) 
        console.log(responce.data);
        if(responce.data.success==true)
    {
       
        await fetchCourses();
    }
}
    
    } catch (error) {
        console.log("Error Deleting the Course");
    }
}






// for fetching the saved courses
const fetchedcourses=ref([]);
const program_id=ref({id:""})


const fetchCourses=async()=>
{
    
    try {
        const responce=await axios.post("/api/admin/getallcourses",program_id.value);
        console.log(responce.data);
        fetchedcourses.value=responce.data
    } catch (error) {
        console.log("error in getting courses",error);
    }
}

onMounted(async()=>
{
    program_id.value.id=prop.id
await fetchCourses();
})

</script>

<style  scoped>
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