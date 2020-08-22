<template>
  <div class="edit-place">
    <h1>{{ this.place.name }}</h1>
    <label v-if="!new_place"> *измените только нужные поля</label>
    <el-card class="edit-place__card">
      <Name
        class="edit-place__element"
        :name="this.place.name"
        @getName="getName"
      />
      <Photo
        class="edit-place__element"
        :image="this.place.image"
        @getImage="getImage"
        @getImageFile="getImageFile"
      />
      <Schedule
        class="edit-place__element"
        :from_hour="this.place.from_hour"
        :to_hour="this.place.to_hour"
        @startTime="getStartTime"
        @endTime="getEndTime"
      />
      <Address
        class="edit-place__element"
        :address="this.place.address"
        @getAddress="getAddress"
      />
      <Dish
        class="edit-place__element"
        :dishes="this.dishes"
        v-show="!this.new_place"
      />
      <div class="edit-place__buttons" v-if="new_place">
        <el-button type="success" class="edit-place__button" @click="addPlace">
          Сохранить
        </el-button>
      </div>
      <div class="edit-place__buttons" v-else>
        <el-button type="success" class="edit-place__button" @click="editPlace">
          Редактировать
        </el-button>
        <a class="edit-place__button" href="#" @click="removePlace">
          Удалить заведение
        </a>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getPlace } from "../api/pagesRequests/places";
import Name from "../components/editPlace/Name";
import Photo from "../components/editPlace/Photo";
import Schedule from "../components/editPlace/Schedule";
import Address from "../components/editPlace/Address";
import Dish from "../components/editPlace/Dish";

export default {
  name: "EditPlace",
  data() {
    return {
      place: {},
      new_place: ""
    };
  },
  components: {
    Name,
    Photo,
    Schedule,
    Address,
    Dish
  },
  methods: {
    ...mapActions([
      "addPlace",
      "removePlace",
      "editPlace",
      "getDishesThisPlace"
    ]),
    getName(name) {
      this.place.name = name;
    },
    getImage(image) {
      this.place.image = image;
    },
    getAddress(address) {
      this.place.address = address;
    },
    getStartTime(from_hour) {
      this.place.from_hour = from_hour;
    },
    getEndTime(to_hour) {
      this.place.to_hour = to_hour;
    },
    getImageFile(file) {
      this.file = file;
    },
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
      if (this.file) {
        formData.set("image", this.file, this.file.name);
      }
      formData.set("address", this.place.address);
      if (this.place.id) {
        formData.set("id", this.place.id);
      }
      return formData;
    },
    addPlace() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("addPlace", data);
        this.$router.push({ name: "Places" });
      }
    },
    removePlace() {
      if (confirm("ALERT! Вы действительно хотите удалить заведение?")) {
        this.$store.dispatch("removePlace", this.place.id);
        this.$router.push({ name: "Places" });
      }
    },
    editPlace() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("editPlace", data);
        this.$router.push({ name: "Places" });
      }
    }
  },
  computed: {
    dishes() {
      return this.$store.state.dishes;
    }
  },
  async created() {
    if (this.$route.params["id"] !== "new") {
      await getPlace(this.$route.params["id"]).then(
        response => (this.place = response)
      );
      this.new_place = false;
      this.getDishesThisPlace(this.place.id);
      this.file = false;
    } else {
      this.new_place = true;
      this.place = {
        address: "",
        from_hour: "",
        image: "",
        name: "",
        to_hour: ""
      };
    }
  }
};
</script>

<style scoped>
.edit-place {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
  overflow: auto;
}

.edit-place__card {
  width: 40%;
  min-width: 330px;
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
</style>
