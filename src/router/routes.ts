import { RouteRecordRaw } from "vue-router"
import NotFoundView from "@/views/NotFoundView.vue"
import HomeView from "@/views/home/HomeView.vue"
import CreateDocumentView from "@/views/documents/CreateDocumentView.vue"
import AreasView from "@/views/areas/AreasView.vue"
import CalendarView from "@/views/calendar/CalendarView.vue"
import ContactsView from "@/views/contacts/ContactsView.vue"
import SettingsView from "@/views/settings/SettingsView.vue"
import SignInView from "@/views/auth/SignInView.vue"
import SetupView from "@/views/auth/SetupView.vue"
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
        path: "create-document",
        name: "CreateDocument",
        component: CreateDocumentView,
      },
      {
        path: "areas",
        name: "Areas",
        component: AreasView,
      },
      {
        path: "calendar",
        name: "Calendar",
        component: CalendarView,
      },
      {
        path: "contacts",
        name: "Contacts",
        component: ContactsView,
      },
      {
        path: "settings",
        name: "Settings",
        component: SettingsView,
      }
    ],
  },
  {
    path: "/auth/signin",
    name: "SignIn",
    component: SignInView,
  },
  {
    path: "/setup",
    name: "Setup",
    component: SetupView,
  },
  // // 404
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: NotFoundView,
  },
]

export default routes