<template>
  <el-container class="create">
    <div class="modal__body">
      <label for="name" class="modal__label"> *Название: </label>
      <el-input id="name" v-model="getIngredientName" class="modal__input" />
    </div>
    <div class="modal__body">
      <label for="calories" class="modal__label"> *Калорийность: </label>
      <el-input id="calories" v-model="getCalories" class="modal__input" />
    </div>
  </el-container>
</template>

<script>
export default {
  name: "IngredientCreate",
  data() {
    return {
      name: "",
      calories: ""
    };
  },
  computed: {
    getIngredientName: {
      get() {
        return this.name;
      },
      set(name) {
        this.name = name;
        this.$emit("getIngredientName", name);
      }
    },
    getCalories: {
      get() {
        return this.calories;
      },
      set(calories) {
        this.calories = calories;
        this.$emit("getCalories", calories);
      }
    }
  }
};
</script>

<style scoped>
.create {
  display: flex;
  flex-direction: column;
  height: 80%;
  background-color: #fff;
  padding: 8px 12px;
  text-align: left;
  border: 1px solid #eee;
  max-height: 400px;
}
.modal__body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  padding: 2px 5px;
  text-align: left;
}
.modal__label {
  width: 50%;
}
.modal__input {
  width: 50%;
}
</style>
