<template>
  <div class="list-elements">
    <label class="list-elements__label" for="button"> Блюда: </label>
    <div class="list-elements__body">
      <el-card class="list-elements__table">
        <div v-for="dish in dishes" :key="dish.id">
          <router-link :to="{ name: 'EditDish', params: { uid: dish.id } }">
            {{ dish.name }}
          </router-link>
        </div>
      </el-card>
      <el-button
        type="primary"
        id="button"
        class="list-elements__button"
        @click="newDish"
      >
        Добавить <br />
        блюдо
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dish",
  props: {
    dishes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    newDish() {
      this.$router.push({ name: "EditDish", params: { uid: "new" } });
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
  max-height: 200px;
}
.list-elements__button {
  width: 50%;
  min-width: 140px;
  padding: 2%;
  max-height: 100px;
}
</style>
