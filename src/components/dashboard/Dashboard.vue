<script setup>
import { ref, computed } from "vue"
import Sidebar from "./Sidebar.vue"
import BarChart from "./charts/BarChart.vue"
import VehicleStatusList from "./charts/VehicleStatusList.vue"
import Fleet from "@/components/dashboard/Fleet.vue"

const sidebarRef = ref(null)

const marginClass = computed(() => {
  return sidebarRef.value?.isOpen ? "ml-64" : "ml-6"
})

const userFirstName = ref("Daniel")
</script>

<template>
  <div class="flex bg-gray-800 w-full h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar ref="sidebarRef" />

    <!-- Main content -->
    <main
      :class="[
        'transition-all duration-300 p-6 flex-1 overflow-auto',
        marginClass,
      ]"
    >
      <h1 class="mb-6 text-slate-200 text-4xl text-center">
        Welcome, {{ userFirstName }}
      </h1>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <!-- Performance Chart -->
        <div class="bg-gray-900 shadow-lg p-4 rounded-2xl">
          <h2 class="mb-4 font-semibold text-white text-lg">
            Performance Overview
          </h2>
          <BarChart />
        </div>

        <!-- Vehicle Status -->
        <div class="bg-gray-900 shadow-lg p-4 rounded-2xl">
          <h2 class="mb-4 font-semibold text-white text-lg">
            Live Vehicle Status
          </h2>
          <VehicleStatusList />
        </div>
      </div>
    </main>
  </div>
</template>
