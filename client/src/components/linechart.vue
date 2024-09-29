<template>
  
      <Line :chart-data="chartData" :width="400" :height="250"  :chart-options="chartOptions"></Line>
    
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from 'chart.js'
  
  // Register necessary Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
  
  // Define reactive chart data
  const chartData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Users Data',
        data: [10, 59, 40, 81, 46, 55, 30],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        
      }
    ]
  })
  
  // Define chart options
  const chartOptions = reactive({
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
  })
  </script>
  

  