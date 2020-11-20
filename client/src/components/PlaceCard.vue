<template>
  <div class="place-cards">
    <el-card class="place-cards__card" :body-style="{ padding: '10px' }">
      <el-container class="place-cards__info">
        <div class="place-cards__description">
          <router-link
            :to="{ name: 'PlaceInfo', params: { id: place.id } }"
            class="place-cards__link"
          >
            <h3>{{ place.name }}</h3>
          </router-link>
          <p>
            {{ isOpen ? "Открыто" : "Закрыто" }}
            {{ place.from_hour }} - {{ place.to_hour }}
          </p>
          <p><i class="el-icon-s-finance"/> Средний чек: {{ place.average_price.toFixed() }}₽</p>
          <p> <i class="el-icon-location" /> {{ place.address }}</p>
          <br />
          <p><i class="el-icon-guide" />  {{ distance.toFixed(2) }} км от вас</p>
        </div>
        <div class="place-cards__image">
          <el-image :src="place.image" :preview-src-list="[place.image]"/>
        </div>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { distanceFromPlace } from "./utils/distanceFromPlace";
import {mapGetters} from "vuex";

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
    ...mapGetters("coords", {latitude: "latitude", longitude: "longitude"}),
    isOpen() {
      return (
        this.place.from_hour < this.timeNow && this.timeNow < this.place.to_hour
      );
    },
    distance() {
      return distanceFromPlace(
        this.place.latitude_deg,
        this.place.longitude_deg
      );
    }
  }
};
</script>

<style scoped>
.place-cards {
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 300px;
}
.place-cards__card {
  display: flex;
  flex-direction: column;
  margin-bottom: 1%;

}
.place-cards__info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}
.place-cards__description {
  position: relative;
  border: 1px solid black;
  background: #eeeeee;
  padding: 2%;
  width: 40%;
  min-width: 280px;
  margin: auto;
  height: 250px;
}
.place-cards__image {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 50%;
  min-width: 300px;
  max-height: 300px;
  padding: 1%;
  margin: auto;
  overflow: hidden;
}
.place-cards__link::before {
  content: "";
  position: absolute;
  width: 90%;
  height: 90%;
}
h3 {
  text-align: center;
}
.el-image {
  width: 100%;
}
@media screen and (max-width: 750px) {
  .place-cards__description {
    width: 80%;
    margin-bottom: 2%;
  }
  .place-cards__image {
    width: 84%;
  }
  .el-card__body {
    padding: 10px !important;
  }
}
</style>
