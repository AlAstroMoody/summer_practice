<template>
  <div class="modal" v-on:click.self="close">
    <div class="modal__body">
      <div class="modal__header">
        <span>{{ modalTitle }}</span>
        <el-link @click="close">&#10006;</el-link>
      </div>
      <div class="modal-content">
        <slot />
      </div>
      <div class="modal__footer">
        <el-button type="success" @click="leftButtonAction" class="modal__button">
          {{ leftButtonTitle }}
        </el-button>
        <el-button
          class="modal__button"
          v-if="rightButtonTitle !== ''"
          type="primary"
          @click="rightButtonAction"
        >
          {{ rightButtonTitle }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalBlank",
  props: {
    modalTitle: {
      type: String,
      default: "Title"
    },
    leftButtonTitle: {
      type: String,
      default: "Ok"
    },
    rightButtonTitle: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    leftButtonAction() {
      this.$emit("leftButtonAction");
    },
    rightButtonAction() {
      this.$emit("rightButtonAction");
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(62, 62, 62, 0.4);
}
.modal__body {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  margin: auto;
  width: 30%;
  min-height: 100px;
  min-width: 300px;
  max-width: 500px;
  z-index: 10;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  top: 5%;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  background: orange;
  text-align: left;
  padding: 8px 12px;
  font-size: 1.5em;
}
.modal__footer {
  display: flex;
  justify-content: space-around;
  background-color: #eee;
  padding: 4px 12px;
  text-align: left;
  flex-wrap: wrap;
}
.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20%;
  background-color: #eee;
}
.modal__button {
  max-width: 200px;
  margin: 5px auto;
}
.el-button {
  line-height: 1;
  white-space: initial;
}
</style>
