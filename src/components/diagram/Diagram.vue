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

export default {
  name: "Diagram",
  components: {
    PieChart,
    ColumnChart,
    LineChart,
    AreaChart
  },
  props: {
    /**
     * Diagram title.
     */
    title: {
      type: String,
      default: ""
    },
    /**
     * Diagram sub title.
     */
    subTitle: {
      type: String,
      default: ""
    },
    /**
     * @values {
     *   series: {
     *     name: string;
     *     y: number;
     *   }[]
     * }
     */
    pieData: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * @values {
     *   categories: String[];
     *   series: {
     *     name: string;
     *     data: number;
     *   }
     *   xText: string;
     *   yText: string;
     * }
     */
    columnData: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * @values {
     *   categories: String[];
     *   series: {
     *     name: string;
     *     data: number;
     *   }
     *   xText: string;
     *   yText: string;
     * }
     */
    lineData: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * @values {
     *   categories: String[];
     *   series: {
     *     name: string;
     *     data: number;
     *   }
     *   xText: string;
     *   yText: string;
     * }
     */
    areaData: {
      type: [Object, Boolean],
      default: false
    }
  },
  data: () => ({
    /**
     * Colors to use in the diagram.
     */
    colors: ["#ABD8F9", "#7BB2DB", "#557A95", "#123C69", "#FCC7C7", "#EE8C8C", "#BD9090", "#8D5F5F", "#CDF1E9", "#88BDBC", "#457E8C", "#254E58"]
  })
};
</script>
