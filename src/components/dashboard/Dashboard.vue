<script setup>
import { ref, computed } from "vue"
import Sidebar from "./Sidebar.vue"

const sidebarRef = ref(null)

const marginClass = computed(() => {
  return sidebarRef.value?.isOpen ? "ml-64" : "ml-16"
})

const userFirstName = ref("Daniel")
</script>

<template>
  <!-- Full-page layout with fixed sidebar -->
  <div class="relative bg-gray-800 w-full h-[100dvh]">
    <!-- Fixed Sidebar -->
    <Sidebar ref="sidebarRef" />

    <!-- Main content beside sidebar -->
    <main
      :class="[
        'transition-all duration-300 p-6 h-[100dvh] overflow-hidden',
        marginClass,
      ]"
    >
      <h1 class="mb-6 text-slate-200 text-4xl">Welcome, {{ userFirstName }}</h1>
      <!-- Add more content here if needed -->
    </main>
  </div>
</template>
