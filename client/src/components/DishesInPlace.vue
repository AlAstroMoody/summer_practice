<template>
  <el-main class="box">
    <el-card
        v-for="dish in dishes"
        :key="dish.id"
        class="box__body"
    >
      <div class="box__card">
        <div class="box__card-header">
          <h4>{{ dish.name }}</h4>
          <el-image :src="dish.photo" :preview-src-list="[dish.photo]" class="box__card-image" alt="img"/>
        </div>
        <div class="box__card-footer">
          <span><i class="el-icon-odometer"/> Калорийность: {{ dish.total_calories }}</span>
          <span> <i class="el-icon-s-finance"/> Цена: {{ dish.price }}₽</span>
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
.box {
  min-width: 140px;
  padding: 2%;
  max-height: 500px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1%;
}

.box__body {
  margin: 1%;
}

.box__card {
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 300px;
  width: 200px;
}

.box__card-header {
  height: 200px;
  margin: auto;
  text-align: center;
}

.box__card-image {
  max-width: 200px;
  max-height: 150px;
}

.box__card-footer {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: flex-end;
  margin: auto;
}
</style>
