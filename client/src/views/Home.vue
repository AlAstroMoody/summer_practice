<template>
  <div class="home">
    <places-filters
      :places="places"
      :filtered="filteredArray"
      @filteredPlaces="filteredPlaces"
      class="home__filters"
    />
    <div class="home__cards">
      <place-card
        :place="place"
        v-for="place in filteredArray"
        :key="place.id"
      />
    </div>
    <el-backtop />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PlaceCard from "@/components/PlaceCard";
import PlacesFilters from "@/components/PlacesFilters";


export default {
  name: "Home",
  data() {
    return {
      filtered: []
    };
  },
  components: {
    PlacesFilters,
    PlaceCard
  },
  computed: {
    ...mapGetters("places", { places: "all" }),
    ...mapGetters("coords", { latitude: "latitude", longitude: "longitude" }),
    filteredArray() {
      if (this.filtered.length > 0) {
        return this.filtered;
      } else return this.places;
    }
  },
  methods: {
    ...mapActions("places", { setPlaces: "setPlaces", sortPlaces: "setSortedPlaces" }),
    ...mapActions("coords", { findCoordinates: "findCoordinates" }),
    getCoordsPosition() {
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch("coords/findCoordinates", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    },
    filteredPlaces(filtered) {
      this.filtered = filtered;
    }
  },
  created() {
    this.setPlaces();
    this.getCoordsPosition();
    this.sortPlaces();
  }
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.home__filters {
  position: sticky;
  top: 20px;
  height: 210px;
  width: 35%;
  min-width: 700px;
  margin-bottom: 40px;
}

.home__cards {
  min-width: 700px;
  width: 60%;
  margin: auto;
}
.el-backtop {
  left: 5%;
  right: 0;
  background: lightgrey;
}
@media screen and (max-width: 1842px) {
  .home__filters {
    position: relative;
  }
}
@media screen and (max-width: 750px) {
  .home__cards {
    width: 80%;
    min-width: 320px;
  }
  .home__filters {
    width: 80%;
    min-width: 320px;
  }
}
</style>
