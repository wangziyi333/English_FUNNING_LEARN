<template>
  <div>
    <canvas ref="lineChart" width="800" height="400"></canvas>
  </div>
</template>
<script setup name="useChart" lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
const lineChart = ref()
onMounted(() => {
  const ctx = lineChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '2025-11-1',
        '2025-11-2',
        '2025-11-3',
        '2025-11-4',
        '2025-11-5',
        '2025-11-6',
        '2025-11-7'
      ],
      datasets: [
        {
          label: '日访问量变化折线图',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.6)',
          hoverBorderColor: 'rgba(75,192,192,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 20
            }
          }
        }
      }
    }
  })
})
</script>

<style scoped>
#lineChart {
  margin: auto;
}
</style>
