<template>
  <div class="list-elements">
    <label class="list-elements__label" for="button"> *Ингредиенты: </label>
    <div class="list-elements__body">
      <el-main class="list-elements__table">
        <div v-for="ingredient in ingredients" :key="ingredient">
          <el-link @click="removeIngredient(ingredient)">
            {{ showIngredientName(ingredient) }}
          </el-link>
        </div>
      </el-main>

      <el-button
        type="primary"
        class="list-elements__button"
        id="button"
        @click="showModal"
      >
        Добавить <br />
        ингредиент
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ingredient",
  props: {
    ingredients: {
      type: Array,
      default: () => []
    },
    allIngredients: {
      type: Array,
      default: () => []
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeIngredient(id) {
      for (let ingredient of this.ingredients) {
        if (ingredient === id) {
          let index = this.ingredients.indexOf(ingredient);
          let data = this.ingredients;
          data.splice(index, 1);
          this.$emit("getIngredients", data);
        }
      }
    },
    showModal() {
      this.$emit("showModal");
    },
    showIngredientName(id) {
      for (let ingredient of this.allIngredients) {
        if (ingredient.id === id) {
          return ingredient.name;
        }
      }
    }
  }
};
</script>

<style scoped>
.list-elements {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.list-elements__label {
  text-align: left;
  width: 25%;
  min-width: 110px;
}

.list-elements__body {
  display: flex;
  width: 75%;
  text-align: left;
}

.list-elements__table {
  width: 50%;
  min-width: 140px;
  padding: 2%;
  max-height: 100px;
  border: 1px solid black;
}

.list-elements__button {
  width: 50%;
  min-width: 140px;
  padding: 2%;
  max-height: 100px;
}
</style>
