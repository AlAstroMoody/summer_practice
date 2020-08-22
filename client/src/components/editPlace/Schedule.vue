<template>
  <div class="schedule">
    <label class="schedule__label" for="time"> *Время работы: </label>
    <div class="schedule__time">
      <el-time-select
        id="time"
        v-model="startTime"
        class="schedule__time-choice"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '24:00'
        }"
      />
      <el-time-select
        v-model="endTime"
        class="schedule__time-choice"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '24:00',
          minTime: startTime
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Schedule",
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
  computed: {
    startTime: {
      get() {
        return this.from_hour;
      },
      set(from_hour) {
        this.$emit("startTime", from_hour);
      }
    },
    endTime: {
      get() {
        return this.to_hour;
      },
      set(to_hour) {
        this.$emit("endTime", to_hour);
      }
    }
  }
};
</script>

<style scoped>
.schedule {
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
}
.schedule__label {
  width: 20%;
  min-width: 90px;
}
.schedule__time {
  display: flex;
  justify-content: space-between;
  width: 75%;
  min-width: 190px;
}
.schedule__time-choice {
  width: 50%;
}
</style>
