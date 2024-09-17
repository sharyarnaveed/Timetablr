<template>
  <input type="file" @change="handleexcel" name="" id="">
</template>

<script setup>
import axios from 'axios';
import * as XLSX from 'xlsx';

// Function to send all data to the backend in one request
async function sendtobackend(data) {
  try {
    const response = await axios.post("/api/admin/timetable", data);
    console.log('Data sent to backend:', data);
  } catch (error) {
    console.log("Error sending data to backend:", error);
  }
}

// Function to handle Excel file upload
const handleexcel = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert the entire sheet to a JSON object
    const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    // Log the parsed Excel data
    console.log('Parsed Excel Data:', excelData);

    // Collect all rows into an array
    const allRows = [];
    for (let i = 1; i < excelData.length; i++) {
      const row = excelData[i]; // Access each row starting from the second row
      
      if (row.length > 0) {
        // Create a new object for each row
        const rowData = {
          days: row[0] || "",
          start_time: row[1] || "",
          end_time: row[2] || "",
          subject: row[3] || "",
          teacher: row[4] || "",
          venu: row[5] || ""
        };

        allRows.push(rowData);
      }
    }

    console.log('All rows data to send:', allRows);

    // Send all rows in one request
    await sendtobackend(allRows);
  };

  reader.readAsArrayBuffer(file);
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
