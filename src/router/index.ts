import { createWebHistory, createRouter } from "vue-router"
// import { useUser } from "@/composables/stores/useUser"

import routes from "./routes"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const { validateToken } = useUser()
//   if (to.path === "/auth/signin" && validateToken()) {
//     next({ path: "/" })
//   }
//   else if (to.meta.requiresAuth && !validateToken()) {
//     next({ path: "/auth" })
//   }
//   else {
//     next()
//   }
// })

export default router