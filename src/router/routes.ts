import { RouteRecordRaw } from "vue-router"
import HomeView from "@/views/home/HomeView.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  // {
  //   path: "/",
  //   redirect: "/menu",
  //   component: DefaultLayout,
  //   children: [
  //     ...MenuRoutes,
  //     ...OrdersRoutes,
  //     ...TablesRoutes,
  //     ...ReservationsRoutes,
  //     ...DashboardRoutes,
  //     ...RestaurantsRoutes,
  //     ...SettingsRoutes,
  //   ],
  // },
  // {
  //   path: "/auth",
  //   component: LoginLayout,
  //   redirect: "/auth/signin",
  //   children: [
  //     ...LoginRoutes,
  //   ],
  // },
  // // 404
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: "NotFound",
  //   component: NotFoundView,
  // },
]

export default routes