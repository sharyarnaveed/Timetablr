<template>
  <div class="Heading">
    <h1>Add Excel Sheet</h1>
  </div>

  <div class="uploadfile">
    <input type="file" @change="handleexcel" name="" id="" />
  </div>

<div class="tableshow">
    <!-- <table>
        <tr>
          <th>Venu Id</th>
          <th>Venu Location</th>
          
        </tr>
        <tr v-for="(venu, index) in venulist" :key="venu.venu_id">

          <td>{{ venu.venu_id }}</td>
          <td>{{ venu.location }}</td>
         
        </tr>
      </table> -->
</div>


</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";
import * as XLSX from "xlsx";

// fecthing venu list
const venulist=ref([]);

// const getvenu=async()=>
// {
// try {
    
// const response=await axios.post("/api/admin/getvenu");
// const newval=response.data;
// console.log(venulist.value);

// venulist.value.push(...newval);




// } catch (error) {
//     console.log(error);
// }
// }

// Function to send all data to the backend in one request
async function sendtobackend(data) {
  try {
    const response = await axios.post("/api/admin/timetable", data);
     
    console.log("Data sent to backend:", data);
    console.log(response);
    router.push("/addVenu")
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
    const workbook = XLSX.read(data, { type: "array" });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the entire sheet to a JSON object
    const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

    // Log the parsed Excel data
    console.log("Parsed Excel Data:", excelData);

    // Collect all rows into an array
    const allRows = [];
    for (let i = 1; i < excelData.length; i++) {
      const row = excelData[i]; // Access each row starting from the second row

      if (row.length > 0) {
        // Create a new object for each row
        const rowData = {
          venu: row[0] || "",
        };

        allRows.push(rowData);

      }
    }

    console.log("All rows data to send:", allRows);

    // Send all rows in one request
    await sendtobackend(allRows);
  };
  
  reader.readAsArrayBuffer(file);
  
};

// fecthing venu list


// onMounted(async()=>
// {
//     await getvenu()
// })





</script>

<style scoped>
.Heading {
  /* border: 2px solid red; */
  height: 10%;
  display: flex;
  justify-content: start;
  padding: 10px 10px;
  font-family: var(--majorfont);
  /* margin: 10px 10px; */
  align-items: center;
  font-size: 2rem;
}
.uploadfile {
  /* border: 2px solid green; */
  height: 50px;
  display: flex;
  align-items: center;
}
.tableshow{
    /* border: 2px solid blue; */
    margin: 30px 0px;
    height: 65%;
    padding: 10px 10px;
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
