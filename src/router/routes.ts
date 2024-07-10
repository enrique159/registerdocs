import { RouteRecordRaw } from "vue-router"
import NotFoundView from "@/views/NotFoundView.vue"
import HomeView from "@/views/home/HomeView.vue"
import CreateRegisterView from "@/views/registers/CreateRegisterView.vue"
import SignInView from "@/views/auth/SignInView.vue"
import MainView from "@/views/MainView.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/auth/signin",
  },
  {
    path: "/main",
    name: "Main",
    redirect: "/main/home",
    component: MainView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "Home",
        component: HomeView,
      },
      {
        path: "create-register",
        name: "CreateRegister",
        component: CreateRegisterView,
      },
    ],
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    component: SignInView,
  },
  // // 404
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: NotFoundView,
  },
]

export default routes