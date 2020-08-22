<template>
  <yandex-map :coords="coords" :zoom="10" class="map">
    <ymap-marker :coords="coords" marker-id="123" hint-content="some hint" />
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  name: "YandexMap",
  props: {
    coords: {
      type: Array,
      default: () => [0, 0]
    }
  },
  components: { yandexMap, ymapMarker }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
