<template>
  <div>
    <!-- Dropdown to change the chart timeframe -->
    <select
      v-model="selectedFilter"
      @change="filterData"
      class="bg-gray-700 mb-4 p-2 rounded text-white"
    >
      <option value="year">Year</option>
      <option value="month">Month</option>
      <option value="week">Week</option>
      <option value="day">Day</option>
      <option value="all">All</option>
    </select>

    <!-- Chart component -->
    <Bar ref="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

// Register core chart.js modules
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "BarChart",
  components: { Bar },

  data() {
    return {
      // Default filter on load
      selectedFilter: "day",

      // This gets populated dynamically based on selectedFilter
      chartData: {
        labels: [],
        datasets: [],
      },

      // Chart appearance and behavior settings
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: { color: "#e5e7eb" },
          },
          title: {
            display: true,
            text: "Freight Shipments",
            color: "#e5e7eb",
            font: { size: 18 },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: "#e5e7eb" } },
          x: { ticks: { color: "#e5e7eb" } },
        },
      },

      // ------------------------------
      // Mock data sources for filtering
      // ------------------------------

      // Yearly data (Jan–Dec)
      yearNumbers: [
        140, 320, 552, 510, 1020, 900, 1130, 600, 710, 600, 750, 700,
      ],

      // Weekly totals for current month
      monthNumbers: [120, 150, 110, 170],

      // Daily totals for current week
      weekNumbers: [20, 35, 40, 25, 50, 10, 5],

      // Hourly totals for current day (24 hours)
      dayNumbers: Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 60 + 10)
      ),
    }
  },

  mounted() {
    // Set initial chart data when component loads
    this.filterData()
  },

  methods: {
    // Update chartData based on selected time range
    filterData() {
      let labels = []
      let data = []

      switch (this.selectedFilter) {
        case "year":
          labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]
          data = this.yearNumbers
          break

        case "month":
          labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
          data = this.monthNumbers
          break

        case "week":
          labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          data = this.weekNumbers
          break

        case "day":
          labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)
          data = this.dayNumbers
          break

        case "all":
          labels = ["Total (YTD)"]
          data = [this.yearNumbers.reduce((sum, n) => sum + n, 0)]
          break
      }

      // Trigger reactivity by assigning a new object
      this.chartData = {
        labels,
        datasets: [
          {
            label: "Freight Shipments",
            data,
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      }
    },
  },
}
</script>
