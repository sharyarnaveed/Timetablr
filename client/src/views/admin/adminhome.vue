<template>
 <main class="adminhome">
    <section class="upperadminhome">

        <section class="userscharts">
    
            <linechart/>
        </section>


    <router-link to="/totheadmindashboard/addcategory"  class="courseslist">
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
    </router-link>

    </section>

    <section class="lowerhome">



        <section class="teacherslist">
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
        </section>
    </section>

 </main>
</template>

<script setup>
import linechart from "@/components/linechart.vue"
import axios from "axios";
import { onMounted,ref } from "vue";
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

<style  scoped>
.adminhome
{
    background-color: #F2F8FD;
    height: 90%;
    /* border: 2px solid red; */
    
    
}
.upperadminhome{
    /* border: 2px solid orange; */
    height: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 15px;
}
.userscharts {
    border: 2px solid rgba(0, 0, 0, 0.226);
    width: 45%;
    height: 95%;
    background-color: white;
    border-radius: 14px;
}

.courseslist
{
    border: 2px solid rgba(0, 0, 0, 0.226);
    width: 45%;
    height: 95%;
    background-color: white;
    border-radius: 14px;
    overflow-y: auto;
    color: black;
    
    text-decoration: none;
}


table {
    font-family: var(--majorfont);
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
.lowerhome{
    /* border: 2px solid red; */
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.teacherslist
{
    border: 2px solid rgba(0, 0, 0, 0.226);
    width: 93%;
    height: 90%;
    background-color: white;
    border-radius: 14px;
}
</style>