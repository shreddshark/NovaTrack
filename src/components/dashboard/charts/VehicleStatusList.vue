<script setup>
import { ref, computed, watch } from "vue"
import { useFleetStore } from "../useFleetStore"

const { vehicles: allVehicles } = useFleetStore()

const perPageOptions = ["5", "10", "20", "50", "All"]
const perPage = ref("5")

const statusFilterOptions = ["All", "In Transit", "Home Base"]
const statusFilter = ref("All")

const currentPage = ref(1)

const filteredVehicles = computed(() => {
  if (statusFilter.value === "All") return allVehicles
  return allVehicles.filter((v) => v.status === statusFilter.value)
})

const totalPages = computed(() => {
  const list = allVehicles || []
  if (perPage.value === "All") return 1
  return Math.ceil(list.length / Number(perPage.value) || 1)
})

const paginatedVehicles = computed(() => {
  const list = filteredVehicles.value || []
  if (perPage.value === "All") return list
  const perPageNum = Number(perPage.value) || 10
  const start = (currentPage.value - 1) * perPageNum
  return list.slice(start, start + perPageNum)
})
watch([statusFilter, perPage], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="space-y-4 bg-gray-800 shadow-lg p-6 rounded-xl text-white">
    <!-- HEADER -->
    <div
      class="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4"
    >
      <h2 class="font-bold text-2xl">Vehicle Status Monitor</h2>

      <!-- Controls -->
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <!-- Per-page -->
        <label class="whitespace-nowrap">
          Show
          <select
            v-model="perPage"
            class="bg-white ml-1 px-2 py-1 rounded text-black"
          >
            <option v-for="opt in perPageOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
          per page
        </label>

        <!-- Status filter -->
        <label class="whitespace-nowrap">
          Status
          <select
            v-model="statusFilter"
            class="bg-white ml-1 px-2 py-1 rounded text-black"
          >
            <option v-for="opt in statusFilterOptions" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <!-- VEHICLE LIST -->
    <ul class="divide-y divide-gray-700">
      <li
        v-for="vehicle in paginatedVehicles"
        :key="vehicle.id"
        class="space-y-1 py-4"
      >
        <div class="flex justify-between items-center">
          <div class="font-semibold text-lg">{{ vehicle.name }}</div>
          <span
            :class="[
              'text-xs font-semibold px-3 py-1 rounded-full',
              vehicle.status === 'In Transit'
                ? 'bg-yellow-400 text-black'
                : 'bg-blue-500 text-white',
            ]"
          >
            {{ vehicle.status }}
          </span>
        </div>

        <div
          class="gap-2 grid grid-cols-2 md:grid-cols-3 text-gray-300 text-sm"
        >
          <div>
            <span class="font-bold text-white">Driver:</span>
            {{ vehicle.driver }}
          </div>
          <div>
            <span class="font-bold text-white">Location:</span>
            {{ vehicle.location }}
          </div>
          <div>
            <span class="font-bold text-white">Fuel:</span>
            {{ vehicle.fuelLevel }}%
          </div>
          <div>
            <span class="font-bold text-white">Mileage:</span>
            {{ vehicle.mileage.toLocaleString() }} mi
          </div>
          <div v-if="vehicle.eta">
            <span class="font-bold text-white">ETA:</span> {{ vehicle.eta }}
          </div>
          <div>
            <span class="font-bold text-white">Last Update:</span>
            {{ vehicle.lastUpdated }}
          </div>
        </div>
      </li>
    </ul>

    <!-- PAGINATION -->
    <div
      v-if="perPage !== 'All' && totalPages > 1"
      class="flex justify-center gap-2 pt-4"
    >
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="bg-gray-700 disabled:opacity-50 px-3 py-1 rounded"
      >
        Prev
      </button>

      <span class="px-2 py-1">{{ currentPage }} / {{ totalPages }}</span>

      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="bg-gray-700 disabled:opacity-50 px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>
