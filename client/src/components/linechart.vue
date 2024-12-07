<template>
  <Line :chart-data="chartData" :width="400" :height="250" :chart-options="chartOptions"></Line>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Reactive chart data
const chartData = ref({
  labels: [], // X-axis labels
  datasets: [
    {
      label: 'Users Data',
      data: [], // Y-axis data
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
});

// Chart options
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Accounts Created',
    },
  },
});

// Fetch graph data
const getGraphData = async () => {
  try {
    const response = await axios.post('/api/admin/graphdata');
    const responseData = response.data[0]; // Extract the first array from the response

    // Map data to chart format
    const labels = responseData.map((item) => item.month); // Extract 'month' values for labels
    const data = responseData.map((item) => item.userCount); // Extract 'userCount' values for dataset

    // Update chartData ref
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = data;

    console.log(chartData.value.labels); // Debug labels
    console.log(chartData.value.datasets[0].data); // Debug dataset
  } catch (error) {
    console.error('Error getting graph data:', error);
  }
};

// Call getGraphData on component mount
onMounted(() => {
  getGraphData();
});
</script>
