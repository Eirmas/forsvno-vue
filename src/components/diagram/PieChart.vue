<template>
  <div
    class="container"
  >
    <highcharts
      :options="options"
    />
    <Legend
      :data="data.series.map((v) => v.name)"
      :colors="colors"
    />
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import accessibility from "highcharts/modules/accessibility";
import Legend from "./Legend.vue";

accessibility(Highcharts);
Highcharts.setOptions({
  lang: {
    numericSymbols: [" tusen", "mill", "mrd", "tri", "*10^15", "*10^18"]
  }
});
export default {
  name: "PieChart",
  components: {
    Legend,
    highcharts: Chart
  },
  props: {
    /**
     * @values {
     *   series: {
     *     name: string;
     *     y: number;
     *   }[]
     * }
     */
    data: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * Array of colors.
     * @values String[]
     */
    colors: {
      type: [Array, Boolean],
      default: false
    }
  },
  computed: {
    /**
     * HighChart options
     */
    options: function () {
      return {
        colors: this.colors,
        credits: {
          enabled: false
        },
        chart: {
          type: "pie",
          style: {
            fontFamily: "Cera Pro, Arial, Helvetica, Verdana, sans-serif",
            fontSize: "14px"
          },
          height: "500",
          events: {
            load: function () {
              setTimeout(() => this.reflow(), 100);
            }
          }
        },
        title: {
          text: ""
        },
        plotOptions: {
          pie: {
            animation: {
              duration: 800
            },
            dataLabels: {
              style: {
                fontSize: "14px",
                fontWeight: "regular"
              },
              enabled: false
            },
            accessibility: {
              enabled: true,
              description: "Du kan benytte tab og piltaster for å navigere gjennom diagrammet.",
              keyboardNavigation: {
                enabled: true
              }
            }
          }
        },
        series: [
          {
            data: this.data.series
          }
        ],
        tooltip: {
          formatter: function () {
            let ret;
            ret = "<div class='diagram__tooltip'>";
            ret += `  <div class="diagram__tooltip-title">${this.key}</div>`;
            ret += "  <div class=\"text-align-center\">";
            ret += `      <div class="diagram__tooltip-value">${Highcharts.numberFormat(this.y, 0, 0, " ")}</div>`;
            ret += `      <div class="diagram__tooltip-suffix">${Highcharts.numberFormat(this.percentage, 0)}%</div>`;
            ret += "  </div>";
            ret += "  <div class=\"diagram__tooltip-box\">";
            ret += "      <div>";
            ret += `        <span class="diagram__tooltip-total diagram__tooltip-border">Total: ${Highcharts.numberFormat(this.total, 0, "0", " ")}</span>`;
            ret += "      </div>";
            ret += "  </div>";
            ret += "</div>";
            return ret;
          },
          useHTML: true,
          backgroundColor: "#F5F7F8",
          shadow: false,
          borderColor: "#F5F7F8",
          followPointer: true
        }
      };
    }
  }
};
</script>

<style>
</style>
