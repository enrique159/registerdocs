import { RouteRecordRaw } from "vue-router"
import HomeView from "@/views/home/HomeView.vue"
import SignInView from "@/views/auth/SignInView.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/auth/signin",
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    component: SignInView,
  },
  // // 404
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: "NotFound",
  //   component: NotFoundView,
  // },
]

export default routes