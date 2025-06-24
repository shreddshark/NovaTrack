import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "@/components/dashboard/Dashboard.vue"
import Login from "@/components/login/LoginPage.vue"
import Fleet from "@/components/dashboard/Fleet.vue"

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
  {
    path: "/fleet",
    name: "Fleet",
    component: Fleet,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
