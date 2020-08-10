<template>
  <div>
    <div
      class="diagram__wrapper-inner"
    >
      <div
        class="label text-align-center diagram__sub-title"
      >
        {{ subTitle }}
      </div>
      <h5
        class="h5 text-align-center diagram__title"
      >
        {{ title }}
      </h5>
      <div
        class="container diagram__info-wrapper"
      >
        <div
          class="diagram__info"
        >
          <button
            @focus="open"
            @click="open"
            @blur="close"
            @mouseover="open"
            @mouseleave="checkClose"
          >
            <InfoIcon />
          </button>
          <div
            ref="bubble"
            class="diagram__info-bubble"
          >
            <div
              class="diagram__info-bubble-close"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="3.5 3.5 17 17"
                style="vertical-align: top;"
              >
                <line
                  style="fill:none;stroke:#191B21;stroke-width:2;stroke-miterlimit:10;"
                  x1="7"
                  y1="7"
                  x2="17"
                  y2="17"
                />
                <line
                  style="fill:none;stroke:#191B21;stroke-width:2;stroke-miterlimit:10;"
                  x1="7"
                  y1="17"
                  x2="17"
                  y2="7"
                />
              </svg>
            </div>
            <p>
              Du kan benytte tab og piltaster for å navigere gjennom diagrammet.
            </p>
            <div
              class="diagram__info-bubble-divider"
            />
            <p>
              You can utilize tab and arrow keys to navigate through the chart.
            </p>
          </div>
        </div>
      </div>
      <pie-chart
        v-if="pieData"
        :data="pieData"
        :colors="colors"
      />
      <column-chart
        v-else-if="columnData"
        :data="columnData"
        :colors="colors"
      />
      <line-chart
        v-else-if="lineData"
        :data="lineData"
        :colors="colors"
      />
      <area-chart
        v-else-if="areaData"
        :data="areaData"
        :colors="colors"
      />
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart.vue";
import ColumnChart from "./ColumnChart.vue";
import LineChart from "./LineChart.vue";
import AreaChart from "./AreaChart.vue";
import InfoIcon from "./InfoIcon.vue";

export default {
  name: "Diagram",
  components: {
    PieChart,
    ColumnChart,
    LineChart,
    AreaChart,
    InfoIcon
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
      type: [Object, Boolean],
      default: false
    },
    columnData: {
      type: [Object, Boolean],
      default: false
    },
    lineData: {
      type: [Object, Boolean],
      default: false
    },
    areaData: {
      type: [Object, Boolean],
      default: false
    }
  },
  methods: {
    open: function () {
      if (this.$refs.bubble) {
        this.$refs.bubble.style.display = "block";
      }
    },
    close: function () {
      if (this.$refs.bubble) {
        this.$refs.bubble.style.display = "none";
      }
    },
    checkClose: function (e) {
      if (document.activeElement !== e.target) {
        this.close();
      }
    }
  },
  data: () => ({
    colors: ["#ABD8F9", "#7BB2DB", "#557A95", "#123C69", "#FCC7C7", "#EE8C8C", "#BD9090", "#8D5F5F", "#CDF1E9", "#88BDBC", "#457E8C", "#254E58"]
  })
};
</script>

<!--<style scoped>-->
<!--.diagram__wrapper-inner {-->
<!--  position: relative;-->
<!--}-->
<!--.diagram__info {-->
<!--  z-index: 1;-->
<!--  position: relative;-->
<!--  right: 2rem;-->
<!--  top: 0;-->
<!--  text-align: right;-->
<!--}-->
<!--.diagram__info button {-->
<!--  color: #191b21;-->
<!--  position: relative;-->
<!--  width: 2rem;-->
<!--  height: 2rem;-->
<!--  font-size: 20px;-->
<!--  background: #C6C7C4;-->
<!--  border-radius: 100%;-->
<!--  align-items: center;-->
<!--  text-align: center;-->
<!--  border: none;-->
<!--}-->
<!--.diagram__info-bubble {-->
<!--  display: none;-->
<!--  max-width: 350px;-->
<!--  position: absolute;-->
<!--  text-align: left;-->
<!--  padding: 1rem;-->
<!--  right: 0;-->
<!--  top: 3rem;-->
<!--  background: #F5F7F8;-->
<!--}-->
<!--.diagram__info-bubble .diagram__info-bubble-divider {-->
<!--  margin: 0.25rem auto;-->
<!--  height: 2px;-->
<!--  width: 40%;-->
<!--  background: #E2E6E9;-->
<!--}-->
<!--.diagram__info-bubble p {-->
<!--  font-size: 1rem;-->
<!--  font-weight: 600;-->
<!--  margin-bottom: 0.5rem;-->
<!--  padding-right: 2rem;-->
<!--}-->
<!--.diagram__info-bubble-close {-->
<!--  cursor: pointer;-->
<!--  width: 24px;-->
<!--  height: 24px;-->
<!--  position: absolute;-->
<!--  right: 1rem;-->
<!--}-->
<!--@media (max-width: 767px) {-->
<!--  .diagram__title {-->
<!--    font-size: 1.4rem;-->
<!--    font-weight: 500;-->
<!--  }-->
<!--}-->
<!--</style>-->
<!--<style>-->
<!--.diagram__tooltip {-->
<!--  padding: 1.75rem 2rem;-->
<!--}-->
<!--.diagram__tooltip-category {-->
<!--  padding-top: 1em;-->
<!--  font-size: 1.125rem;-->
<!--}-->
<!--.diagram__tooltip-title {-->
<!--  font-weight: 400;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  font-size: 2em;-->
<!--  text-align: center;-->
<!--}-->
<!--.diagram__tooltip-total {-->
<!--  font-weight: 500;-->
<!--  padding-top: 0.5em;-->
<!--  text-transform: uppercase;-->
<!--  padding-bottom: 2rem;-->
<!--  font-size: 1.5em;-->
<!--}-->
<!--.diagram__tooltip-box {-->
<!--  padding-top: 0.5rem;-->
<!--  margin-top: 0.5rem;-->
<!--  text-align: center;-->
<!--}-->
<!--.diagram__tooltip-value {-->
<!--  font-weight: 600;-->
<!--  padding: 0;-->
<!--  font-size: 2.75em;-->
<!--}-->
<!--.diagram__tooltip-suffix {-->
<!--  font-size: 1.4rem;-->
<!--}-->
<!--.diagram__tooltip-border {-->
<!--  border-top: 1px solid #E2E6E9;-->
<!--  margin-top: .25em;-->
<!--}-->
<!--.diagram__wrapper-inner {-->
<!--  padding: 5rem 0;-->
<!--}-->
<!--@media (max-width: 991px) {-->
<!--  .diagram__wrapper-inner {-->
<!--    padding: 2rem 0;-->
<!--  }-->
<!--  .diagram__info {-->
<!--    right: 0;-->
<!--  }-->
<!--}-->
<!--.diagram__info-wrapper {-->
<!--  height: 0;-->
<!--  padding: 0;-->
<!--}-->
<!--</style>-->
