<template>
  <div class="home">
    <Filters
      :places="places"
      :filtered="filteredArray"
      @filteredPlaces="filteredPlaces"
    />
    <div class="home__cards">
      <PlaceCard
        :place="place"
        v-for="place in filteredArray"
        :key="place.id"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PlaceCard from "../components/PlaceCard";
import Filters from "../components/Filters";
import { distanceFromPlace } from "../components/distanceFromPlace";

export default {
  name: "Home",
  data() {
    return {
      filtered: []
    };
  },
  components: {
    PlaceCard,
    Filters
  },
  computed: {
    places() {
      return this.$store.state.places;
    },
    latitude() {
      return this.$store.state.coordinate.latitude;
    },
    longitude() {
      return this.$store.state.coordinate.longitude;
    },
    filteredArray() {
      if (this.filtered.length > 0) {
        return this.filtered;
      } else return this.places;
    }
  },
  methods: {
    ...mapActions(["getListPlaces", "findCoordinates"]),
    getCoordPosition() {
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch("findCoordinates", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    },
    sortedPlaces() {
      for (let place of this.places) {
        place.distance = distanceFromPlace(
          place.latitude_deg,
          place.longitude_deg,
          this.latitude,
          this.longitude
        );
      }
      function compare(a, b) {
        if (Number(a.distance) < Number(b.distance)) {
          return -1;
        }
        if (Number(a.distance) > Number(b.distance)) {
          return 1;
        }
        return 0;
      }
      return this.places.sort(compare);
    },
    filteredPlaces(filtered) {
      this.filtered = filtered;
    }
  },
  async created() {
    await this.getListPlaces();
    await this.getCoordPosition();
    await this.sortedPlaces();
  }
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.home__cards {
  min-width: 300px;
  width: 60%;
}
</style>
