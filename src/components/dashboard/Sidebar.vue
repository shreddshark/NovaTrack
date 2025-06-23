<script setup>
import { ref, onMounted, watch } from "vue"
import { gsap } from "gsap"
import { useRoute, useRouter } from "vue-router"
import {
  ChartBarIcon,
  Cog6ToothIcon,
  TruckIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline"

const isOpen = ref(true)
const route = useRoute()
const router = useRouter()
const activeLink = ref(route.path)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

watch(
  () => route.path,
  (newPath) => {
    activeLink.value = newPath
    gsap.to(".active-indicator", {
      x: document.querySelector(`[data-path="${newPath}"]`)?.offsetTop || 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }
)

onMounted(() => {
  // Optional: animate sidebar in
  gsap.from(".sidebar", {
    x: -200,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
  })
})
</script>

<template>
  <aside
    :class="[
      'sidebar h-screen bg-gray-900 text-white shadow-xl transition-all duration-300',
      isOpen ? 'w-64' : 'w-16',
    ]"
  >
    <div class="flex justify-between items-center px-4 py-4">
      <h1 class="font-bold text-neon-green text-xl" v-if="isOpen">NovaTrack</h1>
      <button @click="toggleSidebar" class="focus:outline-none text-white">
        <component :is="isOpen ? XMarkIcon : Bars3Icon" class="w-6 h-6" />
      </button>
    </div>

    <nav class="relative mt-6">
      <ul class="space-y-2">
        <li
          v-for="link in [
            { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
            { name: 'Fleet', icon: TruckIcon, path: '/fleet' },
            { name: 'Reports', icon: ChartBarIcon, path: '/reports' },
            { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
          ]"
          :key="link.path"
          :data-path="link.path"
          @click="router.push(link.path)"
          class="group relative cursor-pointer"
        >
          <div
            :class="[
              'flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-all duration-200',
              route.path === link.path ? 'bg-gray-700 text-neon-green' : '',
            ]"
          >
            <component :is="link.icon" class="w-5 h-5" />
            <span v-if="isOpen">{{ link.name }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.text-neon-green {
  color: #dcdcdc;
}

.sidebar {
  backdrop-filter: blur(10px);
}
</style>
