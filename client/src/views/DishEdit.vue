<template>
  <div class="dish-edit">
    <div class="dish-edit__body">
      <h1>{{ dish.name }}</h1>
      <span v-if="uid"> *измените только нужные поля</span>
      <el-card class="dish-edit__card">
        <input-field
          title="*Название:"
          class="dish-edit__element"
          :value="dish.name"
          @input="updateField('name', $event)"
        />
        <image-field
          class="dish-edit__element"
          :image="dish.photo"
          @input="updateField('image', $event)"
          @newImageFile="newImageFile"
        />
        <input-field
          title="*Цена:"
          class="dish-edit__element"
          :value="String(dish.price)"
          @input="updateField('price', $event)"
        />
        <ingredient-list
          class="dish-edit__element"
          :ingredients="dish.ingredients"
          @input="updateField('ingredients', $event)"
          @showModal="showModal"
        />
        <div class="dish-edit__buttons" v-if="!uid">
          <el-button type="success" class="dish-edit__button" @click="addDish">
            Сохранить
          </el-button>
        </div>
        <div class="dish-edit__buttons" v-else>
          <el-button type="success" class="dish-edit__button" @click="editDish">
            Редактировать
          </el-button>
          <el-button type="text" @click="removeDish">Удалить блюдо</el-button>
        </div>
      </el-card>
    </div>
    <transition name="fade" v-if="modalVisible">
      <modal-blank
        @closeModal="closeModal"
        modalTitle="Добавить ингредиент"
        leftButtonTitle="Добавить выбранные ингредиенты"
        rightButtonTitle="Создать новый ингредиент"
        @rightButtonAction="show2Modal"
        @leftButtonAction="closeModal"
      >
        <IngredientsChoice
          :ingredients="ingredients"
          :ingredientsInDish="dish.ingredients"
          @newIngredients="updateField('ingredients', $event)"
        />
      </modal-blank>
    </transition>
    <transition name="fade" v-if="modal2Visible">
      <modal-blank
        @closeModal="closeModal"
        modalTitle="Создать ингредиент"
        @leftButtonAction="createIngredient"
      >
        <IngredientCreate @newIngredient="newIngredient" />
      </modal-blank>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import IngredientsChoice from "@/components/editDishes/IngredientsChoice";
import IngredientCreate from "@/components/editDishes/IngredientCreate";
import ModalBlank from "@/components/ModalBlank";
import InputField from "@/components/editPlace/InputField";
import IngredientList from "@/components/editDishes/IngredientsList";
import ImageField from "@/components/editPlace/ImageField";

export default {
  name: "DishEdit",
  data() {
    return {
      modalVisible: false,
      modal2Visible: false,
      newImage: false,
      ingredientName: false,
      ingredientCalories: false
    };
  },
  components: {
    ModalBlank,
    ImageField,
    IngredientList,
    InputField,
    IngredientsChoice,
    IngredientCreate
  },
  methods: {
    ...mapActions("dishes", { currentDish: "currentDish" }),
    ...mapActions("ingredients", {setIngredients: "setIngredients"}),
    showModal() {
      this.modalVisible = true;
    },
    show2Modal() {
      this.modalVisible = false;
      this.modal2Visible = true;
    },
    closeModal() {
      if (this.modalVisible) {
        this.modalVisible = false;
      }
      if (this.modal2Visible) {
        this.modal2Visible = false;
        this.modalVisible = true;
      }
    },
    createFormData() {
      let formData = new FormData();
      if (!this.dish.name) {
        this.$message.error("Длина названия 1-20 символов");
        return false;
      }
      if (!this.dish.photo && !this.newImage) {
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
      if (this.newImage) {
        formData.set("photo", this.newImage);
      }
      formData.set("price", this.dish.price);
      if (this.dish.id) {
        formData.set("id", this.uid);
      }
      formData.set("place", this.id);
      for (let ingredient of this.dish.ingredients) {
        formData.append("ingredients", ingredient);
      }
      return formData;
    },
    addDish() {
      let data = this.createFormData();
      if (data) {
        console.log("1", this.$store.getters["dishes/all"])
        this.$store.dispatch("dishes/addDish", data);
        console.log("2", this.$store.getters["dishes/all"])
        this.$router.push({ name: "PlaceEdit", params: { id: this.id } });
      }
    },
    removeDish() {
      this.$confirm("Вы действительно хотите удалить блюдо?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("dishes/removeDish", this.uid);
          this.$router.push({ name: "PlaceEdit", params: { id: this.id } });
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
    editDish() {
      let data = this.createFormData();
      if (data) {
        this.$store.dispatch("dishes/editDish", data);
        this.$router.push({ name: "PlaceEdit", params: { id: this.id } });
      }
    },
    createIngredient() {
      let formData = new FormData();
      this.ingredientName ? formData.set("name", this.ingredientName) : null;
      this.ingredientCalories
        ? formData.set("calories", this.ingredientCalories)
        : null;
      if (/^[1-9]+$/.test(this.ingredientCalories)) {
        this.$store.dispatch("ingredients/addIngredient", formData);
        this.closeModal();
      }
    },
    updateField(fieldName, updateValue) {
      this.$store.dispatch("dishes/updateField", { fieldName, updateValue });
    },
    newImageFile(file) {
      this.newImage = file;
    },
    newIngredient(data) {
      this.ingredientName = data[0];
      this.ingredientCalories = data[1];
    }
  },
  computed: {
    ...mapGetters("ingredients", { ingredients: "all" }),
    ...mapGetters("dishes", { dish: "current" }),
    uid() {
      return +this.$route.params.uid;
    },
    id() {
      return +this.$route.params.id;
    }
  },
  created() {
    if (this.uid && !this.ingredients) {
      console.log("новый запрос ", this.ingredients);
      this.setIngredients();
    }
    this.currentDish(this.uid);
  }
};
</script>

<style scoped>
.dish-edit__body {
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

.dish-edit__card {
  width: 40%;
  min-width: 700px;
  padding: 1%;
}

.dish-edit__element {
  margin: 1%;
}

.dish-edit__buttons {
  display: flex;
  padding-top: 2%;
  justify-content: space-around;
}

.dish-edit__button {
  align-content: flex-start;
  max-width: 50%;
  padding: 2%;
  min-width: 100px;
  max-height: 50px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 750px) {
  .dish-edit__card {
    min-width: 500px;
  }
}
@media screen and (max-width: 550px) {
  .dish-edit__card {
    min-width: 300px;
    width: 80%;
  }
}
</style>
