<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline"

const showPassword = ref(false)
const username = ref("")
const password = ref("")
const router = useRouter()

const handleLogin = () => {
  if (username.value && password.value) {
    router.push("/dashboard")
  }
}
</script>

<template>
  <div class="flex justify-center items-center bg-gray-800 min-h-screen">
    <div class="bg-gray-700 shadow-lg p-8 rounded-2xl w-full max-w-sm">
      <h1 class="mb-6 font-bold text-white text-2xl text-center">
        NovaTrack Login
      </h1>

      <input
        v-model="username"
        type="text"
        placeholder="Username"
        maxlength="15"
        class="bg-gray-700 mb-4 px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
      />

      <div class="relative mb-6">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          maxlength="12"
          class="bg-gray-700 px-4 py-2 pr-10 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="right-2 absolute inset-y-0 flex items-center text-white"
          tabindex="-1"
        >
          <EyeIcon v-if="!showPassword" class="w-5 h-5" />
          <EyeSlashIcon v-else class="w-5 h-5" />
        </button>
      </div>

      <button
        @click="handleLogin"
        class="bg-blue-600 hover:bg-blue-700 py-2 rounded-md w-full font-semibold text-white transition"
      >
        Login
      </button>
    </div>
  </div>
</template>
