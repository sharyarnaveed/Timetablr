<template>
<success v-if="successnotify" :messagevalue="smsg"/>
     <table>
        <tr>
          <th>Teacher Id</th>
          <th>Teacher Name</th>
          <th>Course Name</th>
          <th>Program Name</th>
      
        </tr>
        <tr v-for="teacher in teacherlist" :key="teacher.teacher_id" >

          <td> {{ teacher.teacher_id }}</td>
          <td> {{ teacher.teacher_name  }} </td>
          <td> {{ teacher.course_name  }} </td>
          <td> {{ teacher.program_name  }} </td>
          <td><button class="deletbtn" @click="deleteacher(teacher.teacher_id)" >Delete</button></td>
        </tr>
      </table>
</template>

<script setup>
import success from '@/components/success.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const teacherlist=ref([])
const successnotify=ref(false)
const smsg=ref()
const getteacher=async()=>
{
    try {
        
        const responce=await axios.post("/api/admin/getteacher")
console.log(responce.data);
teacherlist.value=responce.data

    } catch (error) {
        console.log("Error Gettting Teachers",error);
    }
}

const deleteacher=async(id)=>
{
    try {
        console.log(id);

        const responce=await axios.post("/api/admin/deleteteacher",{id})
if(responce.data.success==true)
{
    successnotify.value=true;
    smsg.value=responce.data.message
    setTimeout(() => {
        successnotify.value=false;
    }, 1500);
   
    await getteacher()
}

    } catch (error) {
        console.log("Error Deleting Teacher",error);
    }
}


onMounted(async()=>
{
    await getteacher();
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

.deletbtn
{
    width:140px ;
    height: 30px;
    background-color: var(--skyblue);
    border: none;
    border: 1px solid black;
    font-size: .9rem;
    font-family: var(--majorfont);
}
</style>