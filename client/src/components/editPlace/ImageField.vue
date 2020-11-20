<template>
  <div class="image">
    <label for="image" class="image__label">*Фото:</label>
    <div class="image__preview">
      <el-image v-if="src" :src="src" class="image__image" />
    </div>
    <div class="image__input-wrapper">
      <span class="image__input-label">Добавить/изменить фотографию</span>
      <input
        @input="previewImage('image', $event)"
        class="image__input"
        type="file"
        id="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageField",
  data() {
    return {
      content: false
    };
  },
  props: {
    image: {
      type: String,
      default: ""
    }
  },
  methods: {
    previewImage(fieldName, e) {
      e.preventDefault();
      let photo = e.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        this.content = e.target.result;
        this.$emit("input", this.content);
        this.$emit("newImageFile", photo);
      };
      reader.readAsDataURL(photo);
    }
  },
  computed: {
    src() {
      if (this.content) {
        this.$emit("image", this.content);
        return this.content;
      }
      return this.image;
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
  width: 20%;
  margin-right: 10%;
}

.image__preview {
  width: 31%;
  min-width: 190px;
}

.image__input-wrapper {
  overflow: hidden;
  position: relative;
  background: #eee;
  border-radius: 5px;
  flex: 1;
  min-width: 150px;
  min-height: 30px;
  padding: 3% 0;
  bottom: 5px;
}

.image__input {
  font-size: 999px;
  opacity: 0;
  top: 0;
  left: 0;
  position: absolute;
}

@media screen and (max-width: 550px) {
  .image {
    flex-direction: column;
    align-items: flex-start;
  }
  .image__label {
    width: 100%;
  }
  .image__preview {
    width: 100%;
  }
  .image__input-wrapper {
    width: 100%;
  }
}
</style>
