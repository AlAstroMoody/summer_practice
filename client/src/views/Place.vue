<template>
  <div class="place">
    <div class="place__info">
      <PlaceCard :place="place" />
      <DishesInPlace :dishes="dishes" />
    </div>
    <div class="place__map">
      <YandexMap :coords="[place.latitude_deg, place.longitude_deg]" />
    </div>
  </div>
</template>

<script>
import PlaceCard from "../components/PlaceCard";
import YandexMap from "../components/YandexMap";
import DishesInPlace from "../components/DishesInPlace";
import { mapActions } from "vuex";
export default {
  name: "Place",
  ...mapActions(["getDishesThisPlace", "getCurrentPlace"]),
  components: {
    PlaceCard,
    YandexMap,
    DishesInPlace
  },
  computed: {
    dishes() {
      return this.$store.state.dishes;
    },
    place() {
      return this.$store.state.place;
    }
  },
  async created() {
    await this.$store.dispatch("getCurrentPlace", this.$route.params["id"]);
    await this.$store.dispatch("getDishesThisPlace", this.place.id);
  }
};
</script>

<style scoped>
.place {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.place__info {
  width: 55%;
  min-width: 300px;
}
.place__map {
  width: 44%;
  min-width: 300px;
  min-height: 300px;
}
</style>
