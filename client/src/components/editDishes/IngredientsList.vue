<template>
  <div class="list">
    <label class="list__label" for="button"> *Ингредиенты: </label>
    <div class="list__body">
      <el-main class="list__table">
        <span v-for="ingredient in ingredients" :key="ingredient">
          <el-link @click="removeIngredient(ingredient)">
            {{ showIngredientName(ingredient) }}
          </el-link>
          <br/>
        </span>
      </el-main>
      <el-button
        type="primary"
        class="list__button"
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
import { mapGetters } from "vuex";

export default {
  name: "IngredientList",
  props: {
    ingredients: {
      type: Array,
      default: () => []
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeIngredient(ingredient) {
      let newIngredients = this.ingredients.filter(item => item !== ingredient);
      this.$emit("input", newIngredients);
    },
    showModal() {
      this.$emit("showModal");
    },
    showIngredientName(id) {
      return this.oneIngredient(id).name;
    }
  },
  computed: {
    ...mapGetters("ingredients", {
      allIngredients: "all",
      oneIngredient: "one"
    })
  }
};
</script>

<style scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.list__label {
  text-align: left;
  width: 25%;
  min-width: 110px;
}

.list__body {
  display: flex;
  width: 70%;
  text-align: left;
}

.list__table {
  width: 55%;
  min-width: 140px;
  padding: 2%;
  max-height: 100px;
  border: 1px solid black;
  z-index: 1;
}

.list__button {
  width: 35%;
  min-width: 140px;
  padding: 2%;
  max-height: 100px;
}

@media screen and (max-width: 550px) {
  .list {
    flex-direction: column;
    align-items: flex-start;
  }
  .list__body{
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .list__label {
    width: 100%;
  }
  .list__table {
    width: 100%;
  }
  .list__button {
    width: 100%;
  }
}
</style>
