<template>
  <div class="filters">
    <el-card class="filters__card">
      <div class="filters__input">
        <el-input
          v-model.trim="searchValue"
          placeholder="Поиск по названию"
        ></el-input>
        <el-button type="success" @click="sortPlacesBySearchValue">
          Искать
        </el-button>
      </div>
      <div class="filters__price">
        <p>Средняя стоимость блюда</p>
        <span>до {{ max }}₽ </span>
      </div>
      <el-slider v-model.number="acceptPrice" :max="max"></el-slider>
      <el-checkbox v-model="openPlaces">Только открытые</el-checkbox>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      search: "",
      open: false,
      max: 500,
      price: 1000,
      maxAllowPrice: 5000,
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
        let time = new Date().toLocaleTimeString("en-US", { hour12: false });
        this.newFiltered = this.places.filter(function(place) {
          return place.from_hour < time && time < place.to_hour;
        });
      }
      if (this.searchValue) {
        let value = this.searchValue.toLowerCase();
        this.newFiltered = this.newFiltered.filter(function(place) {
          return place.name.toLowerCase().includes(value);
        });
      }
      if (this.newFiltered.length === 0) {
        this.$message.error("Таких заведений нет!");
      } else this.findMaxAllowPrice(this.newFiltered);
      let price = this.price;
      this.newFiltered = this.newFiltered.filter(function(place) {
        return place.average_price <= price;
      });
      // решить проблему NavigationDuplicated
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
      let priceArray = [];
      for (let place of places) {
        if (place.average_price < this.maxAllowPrice) {
          priceArray.push(place.average_price);
        }
      }
      this.max = Math.max(...priceArray);
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin: 1%;
  width: 35%;
  min-width: 300px;
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
