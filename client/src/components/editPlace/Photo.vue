<template>
  <div class="image">
    <label for="image" class="image__label">*Фото:</label>
    <div class="image__preview">
      <el-image v-if="image" :src="image" class="image__image" />
    </div>
    <div class="image__input-wrapper">
      Добавить/изменить фотографию
      <input
        @change="previewImage"
        class="image__input"
        type="file"
        id="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    image: {
      type: String,
      default: ""
    }
  },
  methods: {
    previewImage: function(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        const isLt1M = input.files[0].size / 1024 / 1024 < 1;
        if (isLt1M) {
          reader.onload = e => {
            this.$emit("getImage", e.target.result);
            this.$emit("getImageFile", input.files[0]);
          };
          reader.readAsDataURL(input.files[0]);
        } else {
          this.$message.error("Добавьте фото, не более 1MB!");
        }
      }
    }
  }
};
</script>

<style scoped>
.image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.image__label {
  text-align: left;
  width: 25%;
}
.image__preview {
  width: 30%;
  min-width: 190px;
}

.image__input-wrapper {
  overflow: hidden;
  position: relative;
  background: #eee;
  border-radius: 1px;
  float: left;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
  min-width: 190px;
  min-height: 30px;
  padding: 3%;
}

.image__input {
  font-size: 999px;
  opacity: 0;
  position: absolute;
}
</style>
