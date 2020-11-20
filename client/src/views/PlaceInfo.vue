<template>
  <div class="place">
    <div class="place__info">
      <place-card :place="place" />
      <dishes-in-place :dishes="dishes" />
    </div>
    <div class="place__map">
      <yandex-map :coords="[place.latitude_deg, place.longitude_deg]" />
    </div>
  </div>
</template>

<script>
import PlaceCard from "../components/PlaceCard";
import YandexMap from "../components/YandexMap";
import DishesInPlace from "../components/DishesInPlace";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Place",
  methods: {
    ...mapActions("dishes", {setPlaceDishes: "setPlaceDishes"}),
    ...mapActions("places", {currentPlace: "currentPlace"}),
  },
  components: {
    PlaceCard,
    YandexMap,
    DishesInPlace
  },
  computed: {
    ...mapGetters("places", {place: "current"}),
    ...mapGetters("dishes", {dishes: "all"}),
    id() {
      return +this.$route.params.id;
    }
  },
  created() {
    this.currentPlace(this.id);
    this.setPlaceDishes(this.id);
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
  min-width: 320px;
}
.place__map {
  width: 44%;
  min-width: 300px;
  min-height: 300px;
}
@media screen and (max-width: 680px) {
  .place__info {
    width: 80%;
    min-width: 320px;
  }
  .place__map {
    width: 80%;
    min-width: 320px;
  }
}
</style>
