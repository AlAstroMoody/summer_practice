<template>
  <el-main class="dishes-in-place">
    <el-card
      v-for="dish in dishes"
      :key="dish.id"
      class="dishes-in-place__body"
    >
      <div class="dishes-in-place__card">
        <div class="dishes-in-place__card-with-image">
          <h4>{{ dish.name }}</h4>
          <img :src="dish.photo" class="dishes-in-place__image" />
        </div>
        <div>
          <p>Калорийность: {{ dish.calories }}</p>
          <p>Цена: {{ dish.price }}₽</p>
        </div>
      </div>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: "DishesInPlace",
  props: {
    dishes: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.dishes-in-place {
  min-width: 140px;
  padding: 2%;
  max-height: 500px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1%;
}
.dishes-in-place__body {
  margin: 1%;
}
.dishes-in-place__card {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.dishes-in-place__card-with-image {
  height: 250px;
}
.dishes-in-place__image {
  max-width: 200px;
  max-height: 200px;
}
</style>
