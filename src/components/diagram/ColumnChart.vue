<template>
  <div
    class="container"
  >
    <highcharts
      :options="options"
      style="max-width: 960px; margin: auto;"
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
    numericSymbols: [" tusen", "mill", "mrd", "tri", "P", "E"]
  }
});
export default {
  name: "ColumnChart",
  components: {
    Legend,
    highcharts: Chart
  },
  props: {
    data: {
      type: [Object, Boolean],
      default: false
    },
    colors: {
      type: [Array, Boolean],
      default: false
    }
  },
  computed: {
    options: function () {
      return {
        colors: this.colors || [],
        credits: {
          enabled: false
        },
        chart: {
          type: "column",
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
          column: {
            borderWidth: 0,
            stacking: "normal",
            pointPadding: 0.1,
            depth: 45,
            accessibility: {
              description: "Du kan benytte tab og piltaster for å navigere gjennom diagrammet.",
              enabled: true,
              keyboardNavigation: {
                enabled: true
              }
            }
          }
        },
        series: this.data.series,
        xAxis: {
          categories: this.data.categories,
          lineColor: "#191B21",
          gridLineColor: "#191B21",
          title: {
            text: this.data.xText,
            style: {
              fontWeight: "600",
              color: "#191b21",
              fontSize: "1.2rem"
            }
          },
          labels: {
            style: {
              fontSize: "16"
            }
          }
        },
        legend: {
          enabled: false
        },
        yAxis: {
          title: {
            text: this.data.yText,
            style: {
              fontWeight: "600",
              color: "#191b21",
              fontSize: "1.2rem"
            }
          },
          labels: {
            style: {
              fontSize: "14"
            }
          },
          min: 0,
          lineColor: "#E2E6E9",
          gridLineColor: "#E2E6E9"
        },
        tooltip: {
          formatter: function () {
            const total = this.points[0].total;
            let ret;
            ret = "<div class='diagram__tooltip'>";
            ret += `  <div class="diagram__tooltip-title">${this.x}</div>`;
            for (let i = 0; i < this.points.length; i++) {
              ret += "  <div class=\"text-align-center diagram__tooltip-border\">";
              ret += `      <div class="diagram__tooltip-category">${this.points[i].series.name}</div>`;
              ret += `      <div class="diagram__tooltip-value">${Highcharts.numberFormat(this.points[i].y, 0, 0, " ")}</div>`;
              ret += `      <div class="diagram__tooltip-suffix">${Highcharts.numberFormat((this.points[i].y / total) * 100, 0)}%</div>`;
              ret += "  </div>";
            }
            ret += "  <div class=\"diagram__tooltip-box\">";
            ret += "      <div>";
            ret += `        <span class="diagram__tooltip-total diagram__tooltip-border">Total: ${Highcharts.numberFormat(total, 0, "0", " ")}</span>`;
            ret += "      </div>";
            ret += "  </div>";
            ret += "<div>";
            return ret;
          },
          footerFormat: "",
          shared: true,
          useHTML: true,
          backgroundColor: "#F5F7F8",
          shadow: false,
          borderColor: "#F5F7F8",
          followPointer: true,
          outside: true
        }
      };
    }
  }
};
</script>
