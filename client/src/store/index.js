import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import places from "@/store/places";
import dishes from "@/store/dishes";
import ingredients from "@/store/ingredients";
import auth from "@/store/auth";
import coords from "@/store/coords";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    places,
    dishes,
    ingredients,
    auth,
    coords
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [createPersistedState()]
});
