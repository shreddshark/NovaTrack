import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "@/components/dashboard/Dashboard.vue"
import Login from "@/components/login/LoginPage.vue"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
