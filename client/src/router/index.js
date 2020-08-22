import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Places from "../views/Places.vue";
import EditPlace from "../views/EditPlace.vue";
import EditDish from "../views/EditDish.vue";
import Auth from "../views/Auth.vue";
import Register from "../views/Register.vue";
import Place from "../views/Place.vue";

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
    name: "EditPlace",
    component: EditPlace,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/owner/places/:id/dish/:uid/",
    name: "EditDish",
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
    name: "Place",
    component: Place
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
