<template>
  <form id="innerdiv" class="quizque_conn" @submit.prevent="submitForm">
    <div v-for="(element, index) in timeTableElements" :key="element.id" class="quizque">
      <!-- for teacher name -->
      <textarea
        placeholder="Write Teacher name"
        required
        v-model="element.textareaValue"
        cols="10"
        rows="10"
      ></textarea>

      <h3 class="credit_hr_heading">Program Name</h3>

      <select required v-model="element.programname">
        <option v-for="(program, index) in gotten_program" :key="program.program_id" :value="program.program_id">
          {{ program.program_name }}
        </option>
      </select>

      <select required v-model="element.coursename">
        <option v-for="(course, index) in gotten_Courses" :key="course.course_id" :value="course.course_id">
          {{ course.course_name }}
        </option>
      </select>

      <button type="button" @click="remove(element.id)">Remove</button>
    </div>

    <button type="submit">Submit</button>
    <!-- Button to add a new course dynamically -->
    <button type="button" @click="addCourse">Add Teacher</button>
  </form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";

// Store for program data
const gotten_program = ref([]);
const gotten_Courses = ref([]);  // Ensure the correct name here
const timeTableElements = ref([]);

// Get the list of programs
const getprogram = async () => {
  try {
    const response = await axios.get("/api/admin/getprogramfromdb");
    gotten_program.value = response.data;
  } catch (error) {
    console.log("Error in getting program list", error);
  }
};

// Watch for changes in the selected program name
watch(
  () => timeTableElements.value.map((element) => element.programname),
  async (newProgramNames, oldProgramNames) => {
    for (let index = 0; index < newProgramNames.length; index++) {
      if (newProgramNames[index] !== oldProgramNames[index]) {
        try {
          const response = await axios.post("/api/admin/getcourselist", {
            program_id: newProgramNames[index],
          });
          gotten_Courses.value = response.data;
        } catch (error) {
          console.log("Error fetching course list:", error);
        }
      }
    }
  },
  { deep: true, immediate: true }
);

// Fetch the program data on component mount
onMounted(() => {
  getprogram();
});

// Add a new course element to the list
const addCourse = () => {
  timeTableElements.value.push({
    id: Date.now(),
    textareaValue: "",
    programname: "",
    coursename: "",
  });
};

// Remove a quiz element by its ID
const remove = (id) => {
  timeTableElements.value = timeTableElements.value.filter(
    (element) => element.id !== id
  );
};

// Handle form submission
const submitForm = async () => {
  const formData = timeTableElements.value.map((element) => ({
    textareaValue: element.textareaValue,
    programname: element.programname,
    coursename: element.coursename,
  }));
  
  try {
    console.log("Form Data:", formData);
    // You can make an API call here to submit the form data
    // const response = await axios.post('/your/api/endpoint', formData);
  } catch (error) {
    console.log("Error submitting form:", error);
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
