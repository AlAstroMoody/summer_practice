<template>
  <div class="address">
    <label class="address__label" for="address"> *Адрес: </label>
    <el-input id="address" class="address__input" v-model="editAddress" />
  </div>
</template>

<script>
export default {
  name: "Address",
  props: {
    address: {
      type: String,
      default: ""
    }
  },
  computed: {
    editAddress: {
      get() {
        return this.address;
      },
      set(address) {
        this.$emit("getAddress", address);
      }
    }
  }
};
</script>

<style scoped>
.address {
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
}
.address__label {
  width: 20%;
  min-width: 90px;
}
.address__input {
  width: 75%;
  min-width: 190px;
}
</style>
