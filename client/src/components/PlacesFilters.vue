<template>
  <div class="filters">
    <el-card class="filters__card">
      <div class="filters__input">
        <el-input
            v-model.trim="searchValue"
            placeholder="Поиск по названию"
        />
        <el-button type="success" @click="sortPlacesBySearchValue">
          Искать
        </el-button>
      </div>
      <div class="filters__price">
        <p>Средняя стоимость блюда</p>
        <span>до {{ acceptPrice }}₽ </span>
      </div>
      <el-slider v-model.number="acceptPrice" :max="maxPrice"/>
      <el-checkbox v-model="openPlaces">Только открытые</el-checkbox>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PlacesFilters",
  data() {
    return {
      search: "",
      open: false,
      max: 0,
      price: 1000,
      timeout: false
    };
  },
  props: {
    places: {
      type: Array,
      default: () => []
    },
    filtered: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    maxPrice() {
      return this.max
    },
    searchValue: {
      get() {
        return this.search;
      },
      set(search) {
        this.search = search;
      }
    },
    openPlaces: {
      get() {
        return this.open;
      },
      set(open) {
        this.open = open;
        this.sortPlacesBySearchValue();
      }
    },
    acceptPrice: {
      get() {
        return this.price;
      },
      set(price) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.price = price;
          this.sortPlacesBySearchValue();
        }, 200);
      }
    }
  },
  methods: {
    sortPlacesBySearchValue() {
      this.newFiltered = this.places;
      if (this.open) {
        let time = new Date().toLocaleTimeString("en-US", {hour12: false});
        this.newFiltered = this.places.filter(place =>
           place.from_hour < time && time < place.to_hour);
      }
      if (this.searchValue) {
        let value = this.searchValue.toLowerCase();
        this.newFiltered = this.newFiltered.filter(place =>
          place.name.toLowerCase().includes(value));
      }
      this.newFiltered = this.newFiltered.filter(place =>
          place.average_price <= this.price
      );
      if (this.newFiltered.length === 0) {
        this.$message.error("Таких заведений нет!");
      } else this.findMaxAllowPrice(this.newFiltered);
      this.$router.replace({
        query: {
          search: this.searchValue,
          open: this.open,
          price: this.price
        }
      });
      this.$emit("filteredPlaces", this.newFiltered);
    },
    findMaxAllowPrice(places) {
      places.forEach(place => this.max < place.average_price ? this.max = place.average_price : null)
    }
  },
  created() {
    this.findMaxAllowPrice(this.places)
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin: 1%;
}

.filters__card {
  text-align: left;
}

.filters__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters__input {
  display: flex;
  justify-content: space-between;
  margin: 2% 0 2% 0;
}
</style>
