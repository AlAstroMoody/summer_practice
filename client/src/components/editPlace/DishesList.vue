<template>
  <label class="list">
    <span class="list__label">Блюда: </span>
    <el-card class="list__table">
      <router-link
        :to="{ name: 'DishEdit', params: { uid: dish.id } }"
        v-for="dish in dishes"
        :key="dish.id"
      >
        <p>{{ dish.name }}</p>
      </router-link>
    </el-card>
    <el-button type="primary" class="list__button" @click="addDish">
      Добавить <br />
      блюдо
    </el-button>
  </label>
</template>

<script>
export default {
  name: "DishesList",
  props: {
    dishes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addDish() {
      this.$router.push({ name: "DishEdit", params: { uid: "new" } });
    }
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
  width: 20%;
  min-width: 90px;
  margin-right: 10%;
}

.list__table {
  width: 39%;
  min-width: 140px;
  max-height: 200px;
}
.list__button {
  width: 30%;
  min-width: 100px;
  max-height: 100px;
}
p {
  line-height: 0.5;
  text-align: left;
}

@media screen and (max-width: 550px) {
  .list {
    flex-direction: column;
    align-items: flex-start;
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
