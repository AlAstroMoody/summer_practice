<template>
  <div class="name">
    <label for="name" class="name__label"> *Название: </label>
    <el-input
      id="name"
      class="name__input"
      v-model="editName"
      maxlength="20"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  name: "Name",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  computed: {
    editName: {
      get() {
        return this.name;
      },
      set(name) {
        this.$emit("getName", name);
      }
    }
  }
};
</script>

<style scoped>
.name {
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
}
.name__label {
  width: 20%;
  min-width: 90px;
}
.name__input {
  width: 75%;
  min-width: 190px;
}
</style>
