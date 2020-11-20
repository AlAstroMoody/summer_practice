import {
  addNewIngredient,
  getIngredients
} from "@/api/pagesRequests/ingredients";

export default {
  namespaced: true,
  state: {
    ingredients: []
  },
  getters: {
    all: state => state.ingredients,
    one: state => id => state.ingredients.find(r => r.id === id)
  },
  mutations: {
    setIngredients: (state, ingredients) => {
      state.ingredients = ingredients;
    },
    addIngredient: (state, ingredient) => {
      state.ingredients.push(ingredient);
    }
  },
  actions: {
    async addIngredient({ commit }, params) {
      commit("addIngredient", await addNewIngredient(params));
    },
    async setIngredients({ commit }) {
      commit("setIngredients", await getIngredients());
    }
  }
};
