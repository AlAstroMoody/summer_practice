<template>
  <div class="edit-place">
    <h1>{{ place.name }}</h1>
    <span v-if="id"> *измените только нужные поля</span>
    <el-card class="edit-place__card">
      <input-field
        class="edit-place__element"
        :value="place.name"
        title="*Название:"
        @input="updateField('name', $event)"
      />
      <image-field
        class="edit-place__element"
        :image="place.image"
        @input="updateField('image', $event)"
        @newImageFile="newImageFile"
      />
      <time-field
        class="edit-place__element"
        :from_hour="place.from_hour"
        :to_hour="place.to_hour"
      />
      <input-field
        class="edit-place__element"
        :value="place.address"
        title="*Адрес:"
        @input="updateField('address', $event)"
      />
      <dishes-list class="edit-place__element" :dishes="dishes" v-show="id" />
      <div class="edit-place__buttons" >
        <el-button type="success" class="edit-place__button" @click="addPlace" v-if="!id">
          Сохранить
        </el-button>
        <el-button type="success" class="edit-place__button" @click="editPlace" v-else>
          Редактировать
        </el-button>
        <el-button type="text" @click="removePlace" v-if="id">
          Удалить заведение
        </el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ImageField from "@/components/editPlace/ImageField";
import InputField from "@/components/editPlace/InputField";
import DishesList from "@/components/editPlace/DishesList";
import TimeField from "@/components/editPlace/TimeField";

export default {
  name: "PlaceEdit",
  data() {
    return {
      newImage: false
    };
  },
  components: {
    TimeField,
    DishesList,
    InputField,
    ImageField
  },
  methods: {
    ...mapActions("dishes", { setPlaceDishes: "setPlaceDishes" }),
    ...mapActions("places", { currentPlace: "currentPlace" }),
    createFormData() {
      let formData = new FormData();
      if (!this.place.name) {
        this.$message.error("Длина названия 1-20 символов");
        return false;
      }
      if (!this.place.image) {
        this.$message.error("Добавьте фото, не более 1MB!");
        return false;
      }
      if (!this.place.address) {
        this.$message.error("Добавьте адрес");
        return false;
      }
      if (!this.place.to_hour || !this.place.from_hour) {
        this.$message.error("Задайте корректное время работы!");
        return false;
      }
      formData.set("name", this.place.name);
      formData.set("from_hour", this.place.from_hour);
      formData.set("to_hour", this.place.to_hour);
      if (this.newImage) {
        formData.set("image", this.newImage);
      }
      formData.set("address", this.place.address);
      if (this.id) {
        formData.set("id", this.id);
      }
      return formData;
    },
    addPlace() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("places/addPlace", data);
        this.$router.push({ name: "Places" });
      }
    },
    removePlace() {
      this.$confirm("Вы действительно хотите удалить заведение?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("places/removePlace", this.id);
          this.$router.push({ name: "Places" });
          this.$message({
            type: "success",
            message: "Удалено!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Отмена удаления"
          });
        });
    },
    editPlace() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("places/editPlace", data);
        this.$router.push({ name: "Places" });
      }
    },
    updateField(fieldName, updateValue) {
      this.$store.dispatch("places/updateField", { fieldName, updateValue });
    },
    newImageFile(file) {
      this.newImage = file;
    }
  },
  computed: {
    ...mapGetters("places", { place: "current" }),
    ...mapGetters("dishes", { dishes: "all" }),
    id() {
      return +this.$route.params.id;
    }
  },
  created() {
    this.setPlaceDishes(this.id);
    this.currentPlace(this.id);
  }
};
</script>

<style scoped>
.edit-place {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  overflow: auto;
  margin: 10px;
}

.edit-place__card {
  width: 40%;
  min-width: 700px;
  padding: 1%;
}

.edit-place__element {
  margin: 1%;
}

.edit-place__buttons {
  display: flex;
  padding-top: 2%;
  justify-content: space-around;
}

.edit-place__button {
  align-content: flex-start;
  max-width: 50%;
  padding: 2%;
  min-width: 100px;
  max-height: 50px;
}

@media screen and (max-width: 750px) {
  .edit-place__card {
    min-width: 500px;
  }
}
@media screen and (max-width: 550px) {
  .edit-place__card {
    min-width: 300px;
    width: 80%;
  }
}
</style>
