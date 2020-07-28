<template>
    <pie-chart v-if="pieData" :title="title" :sub-title="subTitle" :data="pieData" />
    <column-chart v-else-if="columnData" :title="title" :sub-title="subTitle" :data="columnData" />
</template>

<script>
import PieChart from "./PieChart.vue";
import ColumnChart from "./ColumnChart.vue";

export default {
  name: "Diagram",
  components: {
    PieChart,
    ColumnChart
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    pieData: {
      type: [Array, Boolean],
      default: false
    },
    columnData: {
      type: [Array, Boolean],
      default: false
    },
    lineData: {
      type: [Array, Boolean],
      default: false
    }
  }
};
</script>

<style scoped>

</style>
