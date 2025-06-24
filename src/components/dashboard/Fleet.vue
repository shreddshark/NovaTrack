<script setup>
import { ref, reactive, computed, watch } from "vue"

const allVehicles = ref([
  // (your vehicle objects go here unchanged)
])

const STATUS_OPTIONS = ["In Transit", "Home Base"]
const perPageOptions = [5, 10, 20, 50, "All"]

const perPage = ref(10)
const currentPage = ref(1)

const totalPages = computed(() =>
  perPage.value === "All"
    ? 1
    : Math.ceil(allVehicles.value.length / perPage.value)
)

const paginated = computed(() => {
  if (perPage.value === "All") return allVehicles.value
  const start = (currentPage.value - 1) * perPage.value
  return allVehicles.value.slice(start, start + perPage.value)
})

watch(perPage, () => (currentPage.value = 1))

const newVehicle = reactive({
  name: "",
  status: STATUS_OPTIONS[0],
  driver: "",
  location: "",
  fuelLevel: 0,
  mileage: 0,
  eta: "",
  lastUpdated: "",
})

function addVehicle() {
  const nextId = (Math.max(...allVehicles.value.map((v) => v.id)) || 0) + 1
  if (!newVehicle.name.trim()) return
  allVehicles.value.push({ id: nextId, ...newVehicle })
  Object.assign(newVehicle, {
    name: "",
    status: STATUS_OPTIONS[0],
    driver: "",
    location: "",
    fuelLevel: 0,
    mileage: 0,
    eta: "",
    lastUpdated: "",
  })
}

const editingId = ref(null)
const editingCopy = reactive({})

function startEdit(vehicle) {
  editingId.value = vehicle.id
  Object.assign(editingCopy, JSON.parse(JSON.stringify(vehicle)))
}

function cancelEdit() {
  editingId.value = null
}

function saveEdit(id) {
  const idx = allVehicles.value.findIndex((v) => v.id === id)
  if (idx !== -1) {
    allVehicles.value[idx] = { ...editingCopy }
  }
  editingId.value = null
}

function deleteVehicle(id) {
  allVehicles.value = allVehicles.value.filter((v) => v.id !== id)
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
}
</script>

<template>
  <div class="space-y-8 bg-gray-800 shadow-xl p-6 rounded-2xl text-white">
    <div class="flex flex-wrap justify-between items-end gap-4">
      <h1 class="font-bold text-3xl">Fleet Management</h1>
      <label class="hidden sm:flex items-center gap-1 text-sm">
        Show
        <select v-model="perPage" class="bg-white px-2 py-1 rounded text-black">
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
        per page
      </label>
    </div>

    <form
      @submit.prevent="addVehicle"
      class="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-700 p-4 rounded-lg"
    >
      <input
        v-model.trim="newVehicle.name"
        placeholder="Name"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <select
        v-model="newVehicle.status"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      >
        <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
      </select>
      <input
        v-model.trim="newVehicle.driver"
        placeholder="Driver"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <input
        v-model.trim="newVehicle.location"
        placeholder="Location"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <input
        v-model.number="newVehicle.fuelLevel"
        placeholder="Fuel %"
        type="number"
        min="0"
        max="100"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <input
        v-model.number="newVehicle.mileage"
        placeholder="Mileage"
        type="number"
        min="0"
        class="bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <input
        v-model.trim="newVehicle.eta"
        placeholder="ETA"
        class="col-span-1 sm:col-span-2 md:col-span-1 bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <input
        v-model.trim="newVehicle.lastUpdated"
        placeholder="Last Update"
        class="col-span-1 sm:col-span-2 md:col-span-1 bg-gray-600 px-2 py-1 rounded w-full text-white"
      />
      <button
        type="submit"
        class="col-span-full bg-green-600 hover:bg-green-500 py-2 rounded font-semibold"
      >
        Add Vehicle
      </button>
    </form>

    <div class="rounded-lg overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-700 text-left">
          <tr>
            <th class="px-3 py-2">Name</th>
            <th class="px-3 py-2">Status</th>
            <th class="px-3 py-2">Driver</th>
            <th class="px-3 py-2">Location</th>
            <th class="px-3 py-2">Fuel %</th>
            <th class="px-3 py-2">Mileage</th>
            <th class="px-3 py-2">ETA</th>
            <th class="px-3 py-2">Last Update</th>
            <th class="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="vehicle in paginated"
            :key="vehicle.id"
            :class="vehicle.status === 'In Transit' ? 'bg-gray-800/30' : ''"
          >
            <template v-if="editingId !== vehicle.id">
              <td class="px-3 py-2 font-semibold">{{ vehicle.name }}</td>
              <td class="px-3 py-2">{{ vehicle.status }}</td>
              <td class="px-3 py-2">{{ vehicle.driver }}</td>
              <td class="px-3 py-2">{{ vehicle.location }}</td>
              <td class="px-3 py-2">{{ vehicle.fuelLevel }}%</td>
              <td class="px-3 py-2">{{ vehicle.mileage.toLocaleString() }}</td>
              <td class="px-3 py-2">{{ vehicle.eta || "—" }}</td>
              <td class="px-3 py-2">{{ vehicle.lastUpdated }}</td>
              <td class="space-x-2 px-3 py-2 text-center">
                <button
                  @click="startEdit(vehicle)"
                  class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  @click="deleteVehicle(vehicle.id)"
                  class="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </template>
            <template v-else>
              <td class="px-3 py-2">
                <input
                  v-model="editingCopy.name"
                  class="bg-gray-600 px-2 py-1 rounded w-32 w-full text-white"
                />
              </td>
              <td class="px-3 py-2">
                <select
                  v-model="editingCopy.status"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white"
                >
                  <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">
                    {{ s }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="editingCopy.driver"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="editingCopy.location"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="editingCopy.fuelLevel"
                  type="number"
                  min="0"
                  max="100"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white text-right"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="editingCopy.mileage"
                  type="number"
                  min="0"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white text-right"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="editingCopy.eta"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="editingCopy.lastUpdated"
                  class="bg-gray-600 px-2 py-1 rounded w-full text-white"
                />
              </td>
              <td class="space-x-2 px-3 py-2 text-center">
                <button
                  @click="saveEdit(vehicle.id)"
                  class="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit"
                  class="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </td>
            </template>
          </tr>
          <tr v-if="!paginated.length">
            <td colspan="9" class="px-3 py-6 text-gray-400 text-center">
              No vehicles to display.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="perPage !== 'All' && totalPages > 1"
      class="flex justify-center items-center gap-3 pt-4"
    >
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="bg-gray-600 hover:bg-gray-500 disabled:opacity-40 px-3 py-1 rounded text-sm"
      >
        Prev
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="bg-gray-600 hover:bg-gray-500 disabled:opacity-40 px-3 py-1 rounded text-sm"
      >
        Next
      </button>
    </div>
  </div>
</template>
