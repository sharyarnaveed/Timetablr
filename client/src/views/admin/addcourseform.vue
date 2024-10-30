<template>
    <h1 class="course_heading">
      {{ programname }}
    </h1>
  
    
    <!-- Form for quiz elements -->
    <form id="innerdiv" class="quizque_conn" @submit.prevent="submitForm">
      <div v-for="(element, index) in timeTableElements" :key="element.id" class="quizque">
        <textarea placeholder="Write Course name" required v-model="element.textareaValue" cols="10" rows="10"></textarea>
        <button type="button" @click="remove(element.id)">Remove</button>
      </div>
      <button type="submit">Submit</button>
      <!-- Button to add a new course dynamically -->
      <button @click="addCourse">Add Course</button>
    </form>
  
  </template>
  
<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  
  const programname = ref("");
  const Program_info = ref({ id: "" });

  
  const prop = defineProps({ id: String });
  
  // Fetch program name data on mount
  const getData = async () => {
    try {
      const response = await axios.post("/api/admin/getprogram", Program_info.value);
      programname.value = response.data.program[0].program_name;
    } catch (error) {
      console.log("Error fetching program data:", error);
    }
  };
  
  onMounted(async () => {
    Program_info.value.id = prop.id;
    await getData();
  });
  
  // Array for quiz elements
  const timeTableElements = ref([]);
  
  // Add a new quiz element
  const addCourse = () => {
    timeTableElements.value.push({
      id: Date.now(),
      textareaValue: ''
    });
  };
  
  // Remove a quiz element by its ID
  const remove = (id) => {
    timeTableElements.value = timeTableElements.value.filter((element) => element.id !== id);
  };
  
 
  
 
  
  // Handle  form submission
  const submitForm = async() => {
    const formData = timeTableElements.value.map(element => ({
      textareaValue: element.textareaValue,
      programid:prop.id
    }));
    try {
        const responce= await axios.post("/api/admin/savecourses",formData)
        console.log(responce);
    } catch (error) {
        console.log(error);
    }
    console.log('Form Data:', formData);
  };
  </script>
  
  <style scoped>
  .course_heading{
    /* border: 2px solid blue; */
    height: 60px;
    margin: 15px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    font-family: var(--majorfont);
  }
  .quizque_conn {
    /* border: 2px solid gold; */
  margin: 15px 15px;
  }
  .quizque {
    margin: 10px 5px;
    padding: 5px 3%;
    height: 200px;
    width: 98%;
    display: flex;
   /* border: 2px solid red; */
    justify-content: space-around;
    align-items: center;
  }
  .quizque textarea {
    font-size: 16px;
    width: 50%;
    padding: 6px 6px;
    font-size: 1rem;
    height: 30%;
  }
  .quizque button
  {
    width: 12%;
    height: 23%;
    font-size: 1rem;
    font-family: var(--majorfont);
    background-color: var(--skyblue);
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  .quizque button:hover
  {
    background-color: var(--violet);
  }
.quizque_conn button
{
    width: 12%;
    height: 50px;
    font-size: 1rem;
    font-family: var(--majorfont);
    background-color: var(--skyblue);
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 10px 10px;
}
  .upload_excel{
    border: 2px solid green;
    height: 10%;
    display: flex;
    padding: 10px 18px;
    margin: 15px 15px;
    align-items: center;
  }
  .upload_excel button
  {
height: 90%;
width: 15%;
font-size: 1rem;
font-family: var(--majorfont);
background-color: var(--skyblue);
border: none;
border-radius: 5px;
cursor: pointer;
  }
  .upload_excel button:hover
  {
background-color: var(--violet);
  }
  </style>
  