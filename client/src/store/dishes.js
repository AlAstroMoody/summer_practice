import {
  addNewDish,
  editThisDish,
  getOurDishes,
  removeThisDish
} from "@/api/pagesRequests/dishes";

export default {
  namespaced: true,
  state: {
    dishes: [],
    currentDish: {}
  },
  mutations: {
    setDishes: (state, dishes) => {
      state.dishes = dishes;
    },
    addDish: (state, dish) => {
      state.dishes.push(dish);
    },
    editDish: (state, dish) => {
      const index = state.dishes.findIndex(original => original.id === dish.id);
      state.dishes.splice(index, 1, dish);
    },
    removeDish: (state, dish) => {
      const index = state.dishes.indexOf(dish);
      state.dishes.splice(index, 1);
    },
    currentDish: (state, id) => {
      let dish = state.dishes.find(r => r.id === id);
      dish
        ? (state.currentDish = dish)
        : (state.currentDish = {
            name: "",
            price: "",
            photo: "",
            ingredients: []
          });
    },
    updateField: (state, { fieldName, updateValue }) => {
      state.currentDish[fieldName] = updateValue;
    }
  },
  getters: {
    all: state => state.dishes,
    current: state => state.currentDish
  },
  actions: {
    async addDish({ commit }, params) {
      commit("addDish", await addNewDish(params));
    },
    async removeDish({ commit }, id) {
      commit("removeDish", await removeThisDish(id));
    },
    async editDish({ commit }, params) {
      commit("editDish", await editThisDish(params));
    },
    async setPlaceDishes({ commit }, id) {
      commit("setDishes", await getOurDishes(id));
    },
    async currentDish({ commit }, id) {
      commit("currentDish", id);
    },
    async updateField({ commit }, { fieldName, updateValue }) {
      commit("updateField", { fieldName, updateValue });
    }
  }
};
