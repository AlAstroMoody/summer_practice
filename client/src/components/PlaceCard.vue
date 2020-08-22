<template>
  <div class="place-card">
    <el-card class="place-card__card">
      <el-container class="place-card__info">
        <div class="place-card__description">
          <router-link
            :to="{ name: 'Place', params: { id: place.id } }"
            class="place-card__link"
          >
            <h3>{{ place.name }}</h3>
          </router-link>
          <p>
            {{ isOpen ? "Открыто" : "Закрыто" }}
            {{ place.from_hour }} - {{ place.to_hour }}
          </p>
          <p>Средний чек: {{ place.average_price.toFixed() }}₽</p>
          <p>{{ place.address }}</p>
          <br />
          <p>{{ distance.toFixed(2) }} км от вас</p>
        </div>
        <div class="place-card__image">
          <el-image :src="place.image" :preview-src-list="[place.image]">
          </el-image>
        </div>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { distanceFromPlace } from "./distanceFromPlace";

export default {
  name: "PlaceCard",
  props: {
    place: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      timeNow: new Date().toLocaleTimeString("en-US", { hour12: false }),
      open: false
    };
  },
  computed: {
    latitude() {
      return this.$store.state.coordinate.latitude;
    },
    longitude() {
      return this.$store.state.coordinate.longitude;
    },
    isOpen() {
      return (
        this.place.from_hour < this.timeNow && this.timeNow < this.place.to_hour
      );
    },
    distance() {
      return distanceFromPlace(
        this.place.latitude_deg,
        this.place.longitude_deg,
        this.latitude,
        this.longitude
      );
    }
  }
};
</script>

<style scoped>
.place-card {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 1%;
}
.place-card__card {
  display: flex;
  flex-direction: column;
  margin-bottom: 1%;
}
.place-card__info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}
.place-card__description {
  position: relative;
  border: 1px solid black;
  background: #eeeeee;
  padding: 2%;
  min-width: 40%;
}
.place-card__image {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  max-width: 50%;
  min-width: 150px;
  max-height: 300px;
  padding: 1%;
}
.place-card__link::before {
  content: "";
  position: absolute;
  width: 90%;
  height: 90%;
}
</style>
