<template>
  <div class="places-list">
    <div class="places-list__card">
      <h1 class="places-list__title">Мои заведения</h1>
      <el-card class="places-list__body">
        <div
          v-for="place in places"
          :key="place.id"
          class="places-list__elements"
        >
          <router-link :to="{ name: 'PlaceEdit', params: { id: place.id } }"
            >{{ place.name }}
          </router-link>
        </div>
      </el-card>
      <router-link :to="{ name: 'PlaceEdit', params: { id: 'new' } }">
        <el-button class="places-list__button">
          Добавить заведение
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "OwnerPlaces",
  computed: {
    places() {
      return this.placesAll.filter(r => r.owner === this.pk)
    },
    ...mapGetters("places", { placesAll: "all" }),
    ...mapGetters("auth", { pk: "pk" }),
  }
};
</script>

<style>
.places-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.places-list__title {
  display: flex;
}

.places-list__body {
  display: flex;
  margin-bottom: 3%;
}
.places-list__elements {
  margin-bottom: 20%;
  text-align: left;
}
.places-list__card {
  margin: 2%;
  width: 25%;
  min-width: 300px;
}
</style>
