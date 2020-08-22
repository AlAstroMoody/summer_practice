<template>
  <el-container class="choice">
    <el-container>
      <el-main>
        <div v-for="ingredient in ingredients" :key="ingredient.id">
          <label>
            <input
              v-model="selectedElements"
              :value="ingredient.id"
              type="checkbox"
            />
            {{ ingredient.name }}
          </label>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "IngredientsChoice",
  data() {
    return {
      data: this.ingredientsInDish
    };
  },
  props: {
    ingredients: {
      type: Array,
      default: () => []
    },
    ingredientsInDish: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    selectedElements: {
      get() {
        return this.data;
      },
      set(data) {
        this.data = data;
        this.$emit("newIngredients", this.data);
      }
    }
  }
};
</script>

<style scoped>
.choice {
  height: 80%;
  background-color: #fff;
  padding: 8px 12px;
  text-align: left;
  border: 1px solid #eee;
  max-height: 400px;
}
</style>
