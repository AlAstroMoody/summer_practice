import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Places from "../views/OwnerPlaces.vue";
import EditPlace from "../views/PlaceEdit.vue";
import EditDish from "../views/DishEdit.vue";
import Auth from "../views/Auth.vue";
import Register from "../views/Register.vue";
import PlaceInfo from "@/views/PlaceInfo";

Vue.use(VueRouter);
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("token")) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
    return;
  }
  next("/auth");
};
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/owner/places",
    name: "Places",
    component: Places,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/owner/places/:id/",
    name: "PlaceEdit",
    component: EditPlace,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/owner/places/:id/dish/:uid/",
    name: "DishEdit",
    component: EditDish,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/place/:id",
    name: "PlaceInfo",
    component: PlaceInfo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
