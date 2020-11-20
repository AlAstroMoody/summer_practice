<template>
  <label class="schedule">
    <span class="schedule__label">*Время работы: </span>
    <el-time-select
      :value="from_hour"
      @input="updateField('from_hour', $event)"
      class="schedule__time"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '24:00'
      }"
    />
    <el-time-select
      :value="to_hour"
      class="schedule__time"
      @input="updateField('to_hour', $event)"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '24:00',
        minTime: from_hour
      }"
    />
  </label>
</template>

<script>
export default {
  name: "TimeField",
  props: {
    from_hour: {
      type: String,
      default: ""
    },
    to_hour: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateField(fieldName, updateValue) {
      this.$store.dispatch("places/updateField", { fieldName, updateValue });
    }
  }
};
</script>

<style scoped>
.schedule {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  margin: 1%;
}

.schedule__label {
  width: 20%;
  min-width: 90px;
  margin-right: 10%;
}

.schedule__time {
  width: 35%;
  min-width: 140px;
}
@media screen and (max-width: 550px) {
  .schedule {
  flex-direction: column;
    align-items: flex-start;
  }
  .schedule__time {
    width: 100%;
  }
  .schedule__label {
    width: 100%;
  }
}
</style>
