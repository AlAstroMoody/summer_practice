<template>
  <div class="edit-dish">
    <div class="edit-dish__body">
      <h1>{{ this.dish.name }}</h1>
      <label v-if="!new_dish"> *измените только нужные поля</label>
      <el-card class="edit-dish__card">
        <Name
          class="edit-dish__element"
          :name="this.dish.name"
          @getName="getName"
        />
        <Photo
          class="edit-dish__element"
          :image="this.dish.photo"
          @getImage="getImage"
          @getImageFile="getImageFile"
        />
        <Price
          class="edit-dish__element"
          :price="this.dish.price"
          @getPrice="getPrice"
        />
        <Ingredient
          class="edit-dish__element"
          :ingredients="this.dish.ingredients"
          :allIngredients="this.ingredients"
          @getIngredients="getIngredients"
          @showModal="showModal"
        />
        <div class="edit-dish__buttons" v-if="new_dish">
          <el-button type="success" class="edit-dish__button" @click="addDish">
            Сохранить
          </el-button>
        </div>
        <div class="edit-dish__buttons" v-else>
          <el-button type="success" class="edit-dish__button" @click="editDish">
            Редактировать
          </el-button>
          <a class="edit-dish__button" href="#" @click="removeDish">
            Удалить блюдо
          </a>
        </div>
      </el-card>
    </div>
    <Modal
      v-if="modalVisible"
      @closeModal="closeModal"
      modalTitle="Добавить ингредиент"
      leftButtonTitle="Добавить выбранные ингредиенты"
      rightButtonTitle="Создать новый ингредиент"
      @rightButtonAction="show2Modal"
      @leftButtonAction="getIngredients"
    >
      <IngredientsChoice
        :ingredients="this.ingredients"
        :ingredientsInDish="this.dish.ingredients"
        @newIngredients="newIngredients"
      />
    </Modal>
    <Modal
      v-if="modal2Visible"
      @closeModal="closeModal"
      modalTitle="Создать ингредиент"
      @leftButtonAction="goCreate"
    >
      <IngredientCreate
        @getIngredientName="getIngredientName"
        @getCalories="getCalories"
      />
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getDish } from "../api/pagesRequests/dishes";
import Name from "../components/editPlace/Name";
import Photo from "../components/editPlace/Photo";
import Price from "../components/editDishes/Price";
import Ingredient from "../components/editDishes/Ingredient";
import IngredientsChoice from "../components/editDishes/IngredientsChoice";
import IngredientCreate from "../components/editDishes/IngredientCreate";
import Modal from "../components/Modal";

export default {
  name: "EditDish",
  data() {
    return {
      dish: {},
      new_dish: "",
      placeID: this.$route.params["id"],
      dishID: this.$route.params["uid"],
      modalVisible: false,
      modal2Visible: false
    };
  },
  components: {
    Name,
    Photo,
    Price,
    Ingredient,
    Modal,
    IngredientsChoice,
    IngredientCreate
  },
  methods: {
    ...mapActions([
      "addDish",
      "removeDish",
      "editDish",
      "getListIngredients",
      "addIngredient"
    ]),
    getName(name) {
      this.dish.name = name;
    },
    getImage(image) {
      this.dish.photo = image;
    },
    getPrice(price) {
      this.dish.price = price;
    },
    getIngredients(ingredients) {
      if (ingredients) {
        this.dish.ingredients = ingredients;
      }
      this.closeModal();
    },
    getImageFile(file) {
      this.file = file;
    },
    showModal() {
      this.modalVisible = true;
    },
    show2Modal() {
      this.modal2Visible = true;
    },
    closeModal() {
      if (this.modal2Visible && this.modalVisible) {
        this.modal2Visible = false;
      } else this.modalVisible = false;
    },
    goCreate() {
      let formData = new FormData();
      if (
        this.ingredientName &&
        this.ingredientCalories &&
        /^[1-9]+$/.test(this.ingredientCalories)
      ) {
        formData.set("name", this.ingredientName);
        formData.set("calories", this.ingredientCalories);
        this.addIngredient(formData);
        this.closeModal();
      }
    },
    newIngredients(data) {
      this.dish.ingredients = data;
    },
    createFormData() {
      let formData = new FormData();
      if (!this.dish.name) {
        this.$message.error("Длина названия 1-20 символов");
        return false;
      }
      if (!this.dish.photo) {
        this.$message.error("Добавьте фото, не более 1MB!");
        return false;
      }
      if (!this.dish.price) {
        this.$message.error("Добавьте цену блюда!");
        return false;
      }
      if (!this.dish.ingredients || this.dish.ingredients.length === 0) {
        this.$message.error("Добавьте ингредиенты!");
        return false;
      }
      formData.set("name", this.dish.name);
      if (this.file) {
        formData.set("photo", this.file, this.file.name);
      }
      formData.set("price", this.dish.price);
      if (this.dish.id) {
        formData.set("id", this.dish.id);
      }
      formData.set("place", this.placeID);
      for (let ingredient of this.dish.ingredients) {
        formData.append("ingredients", ingredient);
      }
      return formData;
    },
    addDish() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("addDish", data);
        this.$router.push({ name: "EditPlace", params: { id: this.placeID } });
      }
    },
    removeDish() {
      if (confirm("ALERT! Вы действительно хотите удалить блюдо?")) {
        this.$store.dispatch("removeDish", this.dish.id);
        this.$router.push({ name: "EditPlace", params: { id: this.placeID } });
      }
    },
    editDish() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("editDish", data);
        this.$router.push({ name: "EditPlace", params: { id: this.placeID } });
      }
    },
    getIngredientName(name) {
      this.ingredientName = name;
    },
    getCalories(calories) {
      this.ingredientCalories = calories;
    },
    addIngredient(data) {
      if (data) {
        this.$store.dispatch("addIngredient", data);
      }
    }
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  async created() {
    await this.getListIngredients();
    if (this.dishID !== "new") {
      await getDish(this.dishID)
        .then(response => (this.dish = response))
        .catch(error => {
          console.log(error.response.status);
        });
      this.new_dish = false;
      this.file = false;
    } else {
      this.new_dish = true;
      this.dish = {
        price: 0,
        photo: "",
        name: "",
        ingredients: []
      };
    }
  }
};
</script>

<style scoped>
.edit-dish__body {
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

.edit-dish__card {
  width: 40%;
  min-width: 330px;
  padding: 1%;
}

.edit-dish__element {
  margin: 1%;
}

.edit-dish__buttons {
  display: flex;
  padding-top: 2%;
  justify-content: space-around;
}

.edit-dish__button {
  align-content: flex-start;
  max-width: 50%;
  padding: 2%;
  min-width: 100px;
  max-height: 50px;
}
</style>
