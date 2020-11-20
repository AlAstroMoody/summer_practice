<template>
  <label class="field">
    <span class="field__label">{{ title }}</span>
    <el-input class="field__input" v-model="editValue" />
  </label>
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    editValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style scoped>
.field {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  margin: 1%;
}

.field__label {
  width: 20%;
  min-width: 90px;
}

.field__input {
  width: 70%;
  min-width: 170px;
}
@media screen and (max-width: 550px) {
  .field {
    flex-direction: column;
    align-items: flex-start;
  }
  .field__label {
    width: 100%;
  }
  .field__input {
    width: 100%;
  }
}
</style>
