<template>
  <message :messagevalue="theval" v-if="showsuccess"/>
  <form id="innerdiv" class="quizque_conn" @submit.prevent="submitForm">
    <!-- Single form for one teacher -->
    <div class="quizque">
      <!-- Teacher Name -->
      <textarea
        placeholder="Write Teacher name"
        required
        v-model="formData.textareaValue"
        cols="10"
        rows="10"
      ></textarea>

      <h3 class="credit_hr_heading">Program Name</h3>

      <!-- Program Name Dropdown -->
      <select required v-model="formData.programname">
        <option v-for="(program, index) in gotten_program" :key="program.program_id" :value="program.program_id">
          {{ program.program_name }}
        </option>
      </select>

      <!-- Course Name Dropdown -->
      <select required v-model="formData.coursename">
        <option v-for="(course, index) in gotten_Courses" :key="course.course_id" :value="course.course_id">
          {{ course.course_name }}
        </option>
      </select>
    </div>

    <!-- Submit Button -->
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
const showsuccess=ref(false);
const theval=ref("");
import message from "@/components/success.vue"
// Reactive state for form data
const formData = ref({
  textareaValue: "",
  programname: "",
  coursename: "",
});

// Store for program and course data
const gotten_program = ref([]);
const gotten_Courses = ref([]);

// Fetch the list of programs
const getprogram = async () => {
  try {
    const response = await axios.get("/api/admin/getprogramfromdb");
    gotten_program.value = response.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

// Watch for changes in selected program to fetch courses dynamically
watch(
  () => formData.value.programname,
  async (newProgramId) => {
    if (newProgramId) {
      try {
        const response = await axios.post("/api/admin/getcourselist", {
          program_id: newProgramId,
        });
        gotten_Courses.value = response.data;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  }
);

// Fetch programs on component mount
onMounted(async() => {
  await getprogram();
});

// Handle form submission
const submitForm = async () => {
  try {
    const response = await axios.post("/api/admin/saveteacher",formData.value);
    gotten_program.value = response.data;
    console.log(response.data);
if(response.data.sucess==true)
{
showsuccess.value=true
theval.value=response.data.message
await getprogram();
}

  } catch (error) {
    console.log("Error in getting program list", error);
  }
};
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
.credit_hr_heading {
  font-size: 1.3rem;
  font-family: var(--majorfont);
}
.course_heading {
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
  /* border: 2px solid gold;/ */
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
  width: 35%;
  padding: 6px 6px;
  font-size: 1rem;
  height: 30%;
}
.quizque button {
  width: 12%;
  height: 23%;
  font-size: 1rem;
  font-family: var(--majorfont);
  background-color: var(--skyblue);
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.quizque button:hover {
  background-color: var(--violet);
}
.quizque_conn button {
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
.upload_excel {
  border: 2px solid green;
  height: 10%;
  display: flex;
  padding: 10px 18px;
  margin: 15px 15px;
  align-items: center;
}
.upload_excel button {
  height: 90%;
  width: 15%;
  font-size: 1rem;
  font-family: var(--majorfont);
  background-color: var(--skyblue);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.upload_excel button:hover {
  background-color: var(--violet);
}
</style>
