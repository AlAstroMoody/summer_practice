<template>
  <div class="price">
    <label class="price__label" for="price"> *Цена: </label>
    <el-input id="price" class="price__input" v-model="editPrice" />
  </div>
</template>

<script>
export default {
  name: "Price",
  props: {
    price: {
      type: Number,
      default: 0
    }
  },
  computed: {
    editPrice: {
      get() {
        return this.price;
      },
      set(price) {
        this.$emit("getPrice", Number(price));
      }
    }
  }
};
</script>

<style scoped>
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price__label {
  text-align: left;
  width: 20%;
  min-width: 90px;
}
.price__input {
  width: 75%;
  min-width: 190px;
}
</style>
