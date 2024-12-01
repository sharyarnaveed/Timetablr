<template>
  <div class="timetable">
    <h2>Weekly Timetable</h2>

    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through time slots -->
        <tr v-for="timeSlot in timetable" :key="timeSlot.time">
          <td>{{ timeSlot.start_time }}-{{ timeSlot.end_time }}</td>
          <!-- Loop through each day and render the timetable entries -->
          <td v-for="(day, index) in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']" :key="index" class="timetable-cell">
            <div  class="timetable-entry">
              <p><strong></strong></p>
              <p></p>
              <p></p>
            </div>
          
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const timetable = ref([]);



const gettimetabledata = async () => {
  try {
    const response = await axios.post("/api/admin/gettable");
    console.log(response.data);
    timetable.value = response.data
  } catch (error) {
    console.log("Error in getting timetable data", error);
  }
}

onMounted(async () => {
  await gettimetabledata();
});
</script>

<style scoped>
.timetable {
  width: 100%;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.timetable-entry {
  padding: 5px;
  margin: 2px 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}

.timetable-entry p {
  margin: 0;
  font-size: 0.9em;
}
</style>
